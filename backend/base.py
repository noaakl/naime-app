import json
from flask import request
from flask_application import FlaskApplication
from sqlalchemy import func
from utils import spoken_name_2_vec_suggest_names, family_trees_suggest_names, soundex_suggest_names, metaphone_suggest_names, double_metaphone_suggest_names, nysiis_suggest_names, match_rating_codex_suggest_names
from UserSearch import UserSearch
from NameSuggestion import NameSuggestion
from AlgorithemsConstants import algorithems

app = FlaskApplication()
api = app.get_app()
db = app.get_db()

@api.route('/nameList', methods=['GET'])
def dashboard():
    result_dict = {}
    targeted_name = ""
    if request.method == 'GET':
        # selected_name = request.form['name']
        selected_name = request.args.get('name')
        selected_name = selected_name.capitalize()
        targeted_name = selected_name

        result_dict['name'] = selected_name

        name_suggestions = db.session.query(NameSuggestion).filter(
            NameSuggestion.selected_name == selected_name).order_by(NameSuggestion.distance,
                                                                    NameSuggestion.edit_distance,
                                                                    NameSuggestion.rank).all()

        if len(name_suggestions) > 0:

            result_dict = spoken_name_2_vec_suggest_names(selected_name, name_suggestions, result_dict)
            result_dict = family_trees_suggest_names(selected_name, name_suggestions, result_dict)
            result_dict = soundex_suggest_names(selected_name, result_dict)
            result_dict = metaphone_suggest_names(selected_name, result_dict)
            result_dict = double_metaphone_suggest_names(selected_name, result_dict)
            result_dict = nysiis_suggest_names(selected_name, result_dict)
            result_dict = match_rating_codex_suggest_names(selected_name, result_dict)

            spoken_name_2_vec_candidates = [d['candidate'] for d in result_dict["spoken_name_2_vec"]]
            family_trees_candidates = [d['candidate'] for d in result_dict["family_trees"]]
            soundex_candidates = [d['candidate'] for d in result_dict["soundex"]]
            metaphone_candidates = [d['candidate'] for d in result_dict["metaphone"]]
            double_metaphone_candidates = [d['candidate'] for d in result_dict["double_metaphone"]]
            nysiis_candidates = [d['candidate'] for d in result_dict["nysiis"]]
            match_rating_codex_candidates = [d['candidate'] for d in result_dict["match_rating_codex"]]

            other_candidates = list(set(soundex_candidates + metaphone_candidates + double_metaphone_candidates +
                                        nysiis_candidates + match_rating_codex_candidates))

            spoken_name_2_vec_exclusive_names = list(set(spoken_name_2_vec_candidates) - set(other_candidates))

            for exclusive_name in spoken_name_2_vec_exclusive_names:
                spoken_name_suggestions = result_dict["spoken_name_2_vec"]
                for spoken_name_suggestion in spoken_name_suggestions:
                    if spoken_name_suggestion["candidate"] == exclusive_name:
                        spoken_name_suggestion["exclusive"] = 1
                        break

            family_trees_exclusive_names = list(set(family_trees_candidates) - set(other_candidates))

            for exclusive_name in family_trees_exclusive_names:
                suggestions = result_dict["family_trees"]
                for suggestion in suggestions:
                    if suggestion["candidate"] == exclusive_name:
                        suggestion["exclusive"] = 1
                        break


        else:
            result_dict = {}
            # result_dict = name_not_exists_suggest_names(selected_name, result_dict)

        new_user_search = UserSearch(selected_name=selected_name, type_name='', language="English")
        db.session.add(new_user_search)
        db.session.commit()

    # if targeted_name != "":
    #     with open('{0}.json'.format(targeted_name), 'w') as json_file:
    #         json.dump(result_dict, json_file)

    return json.dumps(result_dict)
    # return render_template('dashboard.html', result=result_dict, targeted_name=targeted_name)
    # return render_template('index_naime.html', result=result_dict, targeted_name=targeted_name)


@api.route('/searchList', methods=['GET'])
def searchCountInfo():
    result_dict = {}
    targeted_name = ""
    if request.method == 'GET':
        selected_name = request.args.get('name').capitalize()
        userSearch = db.session.query(UserSearch).filter(UserSearch.selected_name.like(selected_name)).count()
        result_dict['name'] = selected_name
        result_dict['count'] = userSearch
        return result_dict


@api.route('/popularSearches', methods=['GET'])
def popularSearchesInfo():
    count_ = func.count('*')
    limit=5
    results = db.session.query(UserSearch.selected_name, count_).\
        filter(UserSearch.selected_name != '').\
        group_by(UserSearch.selected_name).\
        order_by(count_.desc()).\
        limit(limit).\
        all()

    if results:
        # return {result[0]: result[1] for result in results}
        return json.dumps([(result[0], result[1]) for result in results])

    return {}

@api.route('/rankResults', methods=['PUT'])
def rankResults():
    if not request.json:
        abort(400)
    rankData = request.json
    rankData['user_rank'] = rankData['user_rank'] + rankData['add_rank']
    name = {
        "selected_name": rankData['selected_name'],
        "type_name": algorithems[rankData['type_name']],
        "language": rankData['language'],
        "candidate": rankData['candidate'],
        }
    name_suggestion = db.session.query(NameSuggestion).get(name)
    name_suggestion.user_rank = rankData['user_rank']
    db.session.commit()
    name['user_rank'] = rankData['user_rank']
    return name
        