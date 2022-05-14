import json

import secrets
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
    unset_jwt_cookies, jwt_required, JWTManager
from flask_application import FlaskApplication
from sqlalchemy import func, desc
from utils import createQuery, convertSuggestionsToJson, spoken_name_2_vec_suggest_names, family_trees_suggest_names, \
    soundex_suggest_names, metaphone_suggest_names, double_metaphone_suggest_names, nysiis_suggest_names, \
    match_rating_codex_suggest_names, create_results_dict
from UserSearch import UserSearch
from UsersLikes import UsersLikes
from UsersDislikes import UsersDislikes
from NameSuggestion import NameSuggestion
from AlgorithmsConstants import algorithms
from Users import Users
from passlib.hash import bcrypt
import requests
from lxml.html import fromstring

app = FlaskApplication()
api = app.get_app()
db = app.get_db()

api.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(api)


@api.route('/api/suggestions', methods=['GET'])
def dashboard():
    suggestions = []
    # print(request)
    # result_dict = {}
    # targeted_name = ""
    if request.method == 'GET':
        # print(request.args)
        # selected_name = request.args.get('name')
        selected_name = request.args.get('name', '')
        # username = request.args.get('username')
        username = request.args.get('username', '')
        key = request.args.get('key')
        # selected_name = selected_name.capitalize()
        # targeted_name = selected_name
        # print(selected_name)
        # noaa = str(selected_name).split()
        # print('names: '
        # print(noaa)
        # print([n for n in noaa])
        index = 0
        for name in selected_name.split():
            # print(name)
            name = name.capitalize()
            result_dict = create_results_dict(name, key)
            result_dict['index'] = index
            suggestions.append(result_dict)
            index += 1
            # print(name)
        # print('suggestions:')
        # print(suggestions)
        if username:
            new_user_search = UserSearch(selected_name=selected_name, type_name='', language="English",
                                         user_name=username)
        else:
            new_user_search = UserSearch(selected_name=selected_name, type_name='', language="English")
        db.session.add(new_user_search)
        db.session.commit()

    # if targeted_name != "":
    #     with open('{0}.json'.format(targeted_name), 'w') as json_file:
    #         json.dump(result_dict, json_file)
    # print(json.dumps(suggestions))
    return json.dumps(suggestions)
    # return render_template('dashboard.html', result=result_dict, targeted_name=targeted_name)
    # return render_template('index_naime.html', result=result_dict, targeted_name=targeted_name)


@api.route('/api/searchList', methods=['GET'])
def searchCountInfo():
    result_dict = {}
    targeted_name = ""
    if request.method == 'GET':
        selected_name = request.args.get('name').capitalize()
        userSearch = db.session.query(UserSearch).filter(UserSearch.selected_name.like(selected_name)).count()
        result_dict['name'] = selected_name
        result_dict['count'] = userSearch
        return result_dict


@api.route('/api/rankCount', methods=['GET'])
def rankCount():
    count_ = func.count('*')
    result_dict = {}
    targeted_name = ""
    if request.method == 'GET':
        selected_name = request.args.get('name')
        print(selected_name)
        res = []
        for name in selected_name.split():
            name = name.capitalize()
            print(name)
            likes = db.session.query(UsersLikes.candidate, count_).filter(UsersLikes.selected_name == name).group_by(UsersLikes.candidate).all()
            dislikes = db.session.query(UsersDislikes.candidate, count_).filter(UsersDislikes.selected_name == name).group_by(UsersDislikes.candidate).all()
            # return{
            #     "likes" : {like[0]: like[1] for like in likes},
            #     "dislikes" : {dislike[0]: dislike[1] for dislike in dislikes}
            # }
            # likes_array = []
            # for like in likes:
            #     likes_array.append({'candidate': like[0], 'count':like[1]})
            # print(likes_array)
            print(likes)
            print({
                "likes" : {like[0]: like[1] for like in likes},
                "dislikes" : {dislike[0]: dislike[1] for dislike in dislikes}
            })
            res.append({
             "likes" : {like[0]: like[1] for like in likes},
            "dislikes" : {dislike[0]: dislike[1] for dislike in dislikes}
        })
        return json.dumps(res)
        # return{
        #      "likes" : {like[0]: like[1] for like in likes},
        #     "dislikes" : {dislike[0]: dislike[1] for dislike in dislikes}
        # }


@api.route('/api/popularSearches', methods=['GET'])
def popularSearchesInfo():
    count_ = func.count('*')
    limit = 5
    results = db.session.query(UserSearch.selected_name, count_). \
        filter(UserSearch.selected_name != ''). \
        group_by(UserSearch.selected_name). \
        order_by(count_.desc()). \
        limit(limit). \
        all()

    if results:
        # return {result[0]: result[1] for result in results}
        return json.dumps([(result[0], result[1]) for result in results])

    return {}


@api.route('/api/rankResults', methods=['PUT'])
def rankResults():
    if not request.json:
        abort(400)
    rankData = request.json
    username = rankData['username']
    selected_name = rankData['selected_name']
    candidate = rankData['candidate']
    print(rankData['add_rank'])
    if rankData['add_rank'] == 1:
        user_rank = UsersLikes(user_name=username, selected_name=selected_name, candidate=candidate)
        print(user_rank)
        db.session.add(user_rank)
        db.session.commit()
    elif rankData['add_rank'] == -1:
        # name_suggestion.dislike -= 1
        user_rank = UsersDislikes(user_name=username, selected_name=selected_name, candidate=candidate)
        db.session.add(user_rank)
        db.session.commit()
    return {}


@api.route('/api/editResults', methods=['PUT'])
def editResults():
    if not request.json:
        abort(400)
    rankData = request.json
    username = rankData['username']
    selected_name = rankData['selected_name']
    candidate = rankData['candidate']
    user_rank = {}
    # print(rankData['remove_rank'])
    if rankData['remove_rank'] == 1:
        # name_suggestion.like -= 1
        user_rank = db.session.query(UsersLikes).filter(UsersLikes.user_name == username).filter(UsersLikes.selected_name == selected_name).filter(UsersLikes.candidate == candidate).delete()
        db.session.commit()
        # user_rank = UsersLikes(user_name=username, selected_name=selected_name, candidate=candidate)
    elif rankData['remove_rank'] == -1:
        # name_suggestion.dislike += 1
        user_rank = db.session.query(UsersDislikes).filter(UsersDislikes.user_name == username).filter(UsersDislikes.selected_name == selected_name).filter(UsersDislikes.candidate == candidate).delete()
        db.session.commit()
        # user_rank = UsersDislikes(user_name=username, selected_name=selected_name, candidate=candidate)
    # db.session.delete(user_rank)
    # db.session.commit()
    return {}


@api.route('/api/signUp', methods=['POST'])
def SignUp():
    if not request.json:
        abort(400)
    user_info = request.json
    username_and_password = user_info['user_name'] + user_info['password']
    hashed_password = bcrypt.encrypt(username_and_password)
    api_key = secrets.token_urlsafe(16)
    new_user = Users(user_name=user_info['user_name'], first_name=user_info['first_name'],
                     last_name=user_info['last_name'], email=user_info['email'], password=hashed_password,
                     api_key=api_key)
    db.session.add(new_user)
    db.session.commit()
    return {}


@api.route('/api/signUpCheck', methods=['GET'])
def SignUpCheck():
    user_name = request.args.get('user_name')
    user_name_search = db.session.query(Users).filter(Users.user_name == user_name).all()
    if len(user_name_search) > 0:
        return {"result": False}
    return {"result": True}


@api.route('/api/login', methods=["POST"])
def login():
    user_name = request.json.get("user_name", None)
    password = request.json.get("password", None)
    user_name_search = db.session.query(Users).filter(Users.user_name == user_name).all()
    if len(user_name_search) == 0:
        return {"msg": "Wrong user name or password"}, 401
    user = user_name_search[0]
    username_and_password = user_name + password
    valid_password = bcrypt.verify(username_and_password, user.password)
    if not valid_password:
        return {"msg": "Wrong user name or password"}, 401
    user_likes = db.session.query(UsersLikes).filter(UsersLikes.user_name == user_name).all()
    user_dislikes = db.session.query(UsersDislikes).filter(UsersDislikes.user_name == user_name).all()
    likes = {user_like.selected_name: [] for user_like in user_likes}
    dislikes = {user_dislike.selected_name: [] for user_dislike in user_dislikes}
    for user_like in user_likes:
        likes[user_like.selected_name].append(user_like.candidate)
    dislikes = {user_dislike.selected_name: [] for user_dislike in user_dislikes}
    for user_dislike in user_dislikes:
        dislikes[user_dislike.selected_name].append(user_dislike.candidate)

    access_token = create_access_token(identity=user.user_name)

    user_info = {
        "user_name": user.user_name,
        "access_token": access_token,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "api_key": user.api_key,
        "likes": likes,
        "dislikes": dislikes,
        "likes_count": len(user_likes),
        "dislikes_count": len(user_dislikes)
    }
    return user_info


@api.route('/api/lastSearches', methods=["GET"])
def lastSearches():
    username = request.args.get('username')
    if username:
        limit = 5
        results = db.session.query(UserSearch.selected_name, UserSearch.search_date). \
            filter(UserSearch.selected_name != '' and UserSearch.user_name == username). \
            order_by(desc(UserSearch.search_date)). \
            limit(limit). \
            all()
        # group_by(UserSearch.selected_name).\

        if results:
            # return {result[0]: result[1] for result in results}
            # print(json.dumps([(result[0]) for result in results]))
            return json.dumps([(result[0]) for result in results])

    return json.dumps([])


@api.route('/api/lastRanks', methods=["GET"])
def lastRanks():
    username = request.args.get('username')
    if username:
        limit = 5
        results = db.session.query(UsersLikes.selected_name, UsersLikes.candidate, UsersLikes.date). \
            filter(UsersLikes.user_name == username). \
            order_by(desc(UsersLikes.date)). \
            limit(limit). \
            all()

        if results:
            return json.dumps([(result[0], result[1]) for result in results])

    return json.dumps([])


@api.route('/api/lastDislike', methods=["GET"])
def lastDislike():
    username = request.args.get('username')
    if username:
        limit = 5
        results = db.session.query(UsersDislikes.selected_name, UsersDislikes.candidate, UsersDislikes.date). \
            filter(UsersDislikes.user_name == username). \
            order_by(desc(UsersDislikes.date)). \
            limit(limit). \
            all()

        if results:
            return json.dumps([(result[0], result[1]) for result in results])
    return json.dumps([])


@api.route('/api/googleSearch', methods=["POST"])
def googleSearch():
    try:
        from googlesearch import search
        name = request.json.get("name", "")
        suggestions = request.json.get("suggestions", [])
        user_likes = request.json.get("userLikes", [])
        # print(suggestions)
        query = createQuery(name, suggestions, user_likes)
        # print(query)
        # query = "noaa"
        res = []
        # res = [search_result for search_result in search(query, tld="co.in", num=10, stop=10, pause=2, lang='en')]
        # res = [search_result for search_result in search(query, tld="co.in", num=10, stop=10, lang='en')]
        # res = [search_result for search_result in search(query, tld="co.in", num=10, stop=10, lang='en', safe=True, extra_params={'filter': '1'})]#, 'sourceid': 'chrome', 'ie': 'UTF-8', '-site': 'wikipedia'})] #'-related': 'https://en.wikipedia.org/wiki'#, '-site': 'youtube.com'})]
        res = [search_result for search_result in search(query, pause=2, num=10, stop=10)]#'filter': '1', 'sourceid': 'chrome', 'ie': 'UTF-8', 'site': '-wikipedia'})] #'-related': 'https://en.wikipedia.org/wiki'#, '-site': 'youtube.com'})]
        # res = []
        # for search_result in search(query, tld="co.in", num=10, stop=10, lang='en', safe=True, extra_params={'filter': '0'}):
        #     res.append(search_result)
        res_final = {}
        for url in res:
            # print(url)
            x = requests.get(url)
            tree = fromstring(x.content)
            res_final[url]=tree.findtext('.//title')
        return json.dumps([res_final])
        # return json.dumps([])
    except ImportError:
        print("No module named 'google' found")
        return json.dumps([])

@api.route('/api/googleQuery', methods=["POST"])
def googleQuery():
    # from googlesearch import search, get_random_user_agent
    name = request.json.get("name", "")
    suggestions = request.json.get("suggestions", {})
    user_likes = request.json.get("userLikes", [])
    # print(suggestions)
    query = createQuery(name, suggestions, user_likes)
    return json.dumps({"query": query})
