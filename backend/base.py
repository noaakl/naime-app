import json
import secrets
from flask import Flask, request, jsonify, send_from_directory
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, JWTManager
from flask_application import FlaskApplication
from sqlalchemy import func, desc
from utils import createQuery, create_results_dict
from UserSearch import UserSearch
from UsersLikes import UsersLikes
from UsersDislikes import UsersDislikes
from NameSuggestion import NameSuggestion
from AlgorithmsConstants import algorithms
from Users import Users
from passlib.hash import bcrypt
import requests
# from lxml.html import fromstring

app = FlaskApplication()
api = app.get_app()
db = app.get_db()

api.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(api)

@api.route('/')
def index():
    return send_from_directory(api.static_folder,'index.html')
    # return api.send_static_file('index.html')

# @api.route('/', defaults={'path': ''})
# def index():
#     

@api.route('/about')
def aboutPage():
    return send_from_directory(api.static_folder,'index.html')

@api.route('/AlgorithmsInfo')
def algorithmsInfoPage():
    return send_from_directory(api.static_folder,'index.html')

@api.route('/login')
def loginPage():
    return send_from_directory(api.static_folder,'index.html')

@api.route('/signUp')
def signUpPage():
    return send_from_directory(api.static_folder,'index.html')

@api.route('/userInfo')
def userInfoPage():
    return send_from_directory(api.static_folder,'index.html')

@api.route('/search/<string:name>')
def searchNamePage(name):
    return send_from_directory(api.static_folder,'index.html')

@api.route('/api/suggestions', methods=['GET'])
def dashboard():
    suggestions = []
    if request.method == 'GET':
        selected_name = request.args.get('name', '')
        selected_name = selected_name.title()
        username = request.args.get('username', '')
        key = request.args.get('key')
        index = 0
        for name in selected_name.split():
            result_dict = create_results_dict(name, key, index)
            suggestions.append(result_dict)
            index += 1
        if not key:
            if username:
                new_user_search = UserSearch(selected_name=selected_name, type_name='', language="English",
                                             user_name=username)
            else:
                new_user_search = UserSearch(selected_name=selected_name, type_name='', language="English")
            db.session.add(new_user_search)
            db.session.commit()
    return json.dumps(suggestions)


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
        res = []
        for name in selected_name.split():
            name = name.capitalize()
            likes = db.session.query(UsersLikes.candidate, count_).filter(UsersLikes.selected_name == name).group_by(
                UsersLikes.candidate).all()
            dislikes = db.session.query(UsersDislikes.candidate, count_).filter(
                UsersDislikes.selected_name == name).group_by(UsersDislikes.candidate).all()
            res.append({
                "likes": {like[0]: like[1] for like in likes},
                "dislikes": {dislike[0]: dislike[1] for dislike in dislikes}
            })
        return json.dumps(res)


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
    if rankData['add_rank'] == 1:
        user_rank = UsersLikes(user_name=username, selected_name=selected_name, candidate=candidate)
        db.session.add(user_rank)
        db.session.commit()
    elif rankData['add_rank'] == -1:
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
    if rankData['remove_rank'] == 1:
        user_rank = db.session.query(UsersLikes).filter(UsersLikes.user_name == username).filter(
            UsersLikes.selected_name == selected_name).filter(UsersLikes.candidate == candidate).delete()
        db.session.commit()
    elif rankData['remove_rank'] == -1:
        user_rank = db.session.query(UsersDislikes).filter(UsersDislikes.user_name == username).filter(
            UsersDislikes.selected_name == selected_name).filter(UsersDislikes.candidate == candidate).delete()
        db.session.commit()
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
        results = db.session.query(UserSearch.selected_name, UserSearch.search_date) \
            .filter(UserSearch.selected_name != '' and UserSearch.user_name == username) \
            .order_by(desc(UserSearch.id)) \
            .limit(limit). \
            all()

        if results:
            return {i: results[i][0] for i in range(len(results))}

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


@api.route('/api/query', methods=["POST"])
def query():
    name = request.json.get("name", "")
    suggestions = request.json.get("suggestions", {})
    user_likes = request.json.get("userLikes", [])
    numOfQueryNames = request.json.get("numOfQueryNames", 3)
    fullNumOfQueryNames = 10
    query = createQuery(name, suggestions, user_likes, numOfQueryNames)
    full_query = createQuery(name, suggestions, user_likes, fullNumOfQueryNames)
    return json.dumps({
        "query": query,
        "full_query": full_query
    })


@api.route('/api/userQuery', methods=["POST"])
def userQuery():
    query_names = request.json.get("queryNames", [])
    query = ''
    if query_names:
        for number_index in range(len(query_names)):
            name = query_names[number_index]
            full_name = ""
            for name_index in range(len(name)):
                name_part = name[name_index]
                full_name += name_part.title()
                if name_index < len(name) - 1:
                    full_name += ' '
            query += '"{}"'.format(full_name)
            if number_index < len(query_names) - 1:
                query += ' OR '
    return json.dumps({"query": query})
