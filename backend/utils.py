import json
import math

from PhoneticAlgorithmsCodes import PhoneticAlgorithmsCodes
from flask_application import FlaskApplication
from NameSuggestion import NameSuggestion
from Users import Users
import jellyfish
import phonetics
import editdistance
from sqlalchemy import or_
from AlgorithmsConstants import algorithms

flask_app = FlaskApplication()
app = flask_app.get_app()
db = flask_app.get_db()


def spoken_name_2_vec_suggest_names(name_suggestions, result_dict):
    result_dict['spoken_name_2_vec'] = []

    candidates = []
    distinct_candidate_set = set()
    optional_candidates = []

    for name_suggestion in name_suggestions:
        name_type = name_suggestion.type_name
        if name_type == "Sound":
            optional_candidates.append(name_suggestion)

    for name_suggestion in optional_candidates:
        candidate = name_suggestion.candidate
        distance_str = name_suggestion.distance
        distance = float(distance_str)
        if not candidate in distinct_candidate_set and len(distinct_candidate_set) < 10:
            candidate_dict, candidates, distinct_candidate_set = convert_name_suggestion_into_result(name_suggestion,
                                                                                                     candidate,
                                                                                                     candidates,
                                                                                                     distinct_candidate_set)

        elif not candidate in distinct_candidate_set and distance == 0:
            candidate_dict, candidates, distinct_candidate_set = convert_name_suggestion_into_result(
                name_suggestion, candidate, candidates, distinct_candidate_set)

    result_dict['spoken_name_2_vec'] = candidates
    return result_dict


def convert_name_suggestion_into_result(name_suggestion, candidate, candidates, distinct_candidate_set):
    candidate_dict = flask_app.convert_name_suggestion_into_spoken_name_2_vec_result(name_suggestion)
    candidates.append(candidate_dict)

    distinct_candidate_set.add(candidate)

    return candidate_dict, candidates, distinct_candidate_set


def family_trees_suggest_names(name_suggestions, result_dict):
    result_dict['family_trees'] = []

    candidates = []
    distinct_candidate_set = set()
    family_trees_suggestions = []
    for name_suggestion in name_suggestions:
        name_type = name_suggestion.type_name
        if name_type == "Family_Tree":
            family_trees_suggestions.append(name_suggestion)

    family_trees_suggestions.sort(key=lambda candidate: (candidate.rank, candidate.edit_distance))

    for family_tree_suggestion in family_trees_suggestions:
        candidate = family_tree_suggestion.candidate
        if candidate not in distinct_candidate_set and len(distinct_candidate_set) < 10:
            candidate_dict, candidates, distinct_candidate_set = convert_name_suggestion_into_result(
                family_tree_suggestion,
                candidate,
                candidates,
                distinct_candidate_set)

    result_dict['family_trees'] = candidates
    return result_dict


def soundex_suggest_names(selected_name, result_dict):
    result_dict['soundex'] = []
    selected_name_soundex = jellyfish.soundex(selected_name)
    name_suggestions = db.session.query(PhoneticAlgorithmsCodes).filter(
        PhoneticAlgorithmsCodes.soundex == selected_name_soundex).limit(10).all()

    candidates = []
    for name_suggestion in name_suggestions:
        candidate_dict = flask_app.convert_name_suggestion_into_soundex_result(name_suggestion)
        candidate_name = candidate_dict["candidate"]
        if candidate_name != selected_name:
            candidates.append(candidate_dict)

    result_dict['soundex'] = candidates
    return result_dict


def metaphone_suggest_names(selected_name, result_dict):
    result_dict['metaphone'] = []
    selected_name_metaphone = phonetics.metaphone(selected_name)

    name_suggestions = db.session.query(PhoneticAlgorithmsCodes).filter(
        PhoneticAlgorithmsCodes.metaphone == selected_name_metaphone).limit(10).all()

    candidates = []
    for name_suggestion in name_suggestions:
        candidate_dict = flask_app.convert_name_suggestion_into_metaphone_result(name_suggestion)
        candidate_name = candidate_dict["candidate"]
        if candidate_name != selected_name:
            candidates.append(candidate_dict)

    result_dict['metaphone'] = candidates
    return result_dict


def double_metaphone_suggest_names(selected_name, result_dict):
    result_dict['double_metaphone'] = []
    selected_name_double_metaphone = phonetics.dmetaphone(selected_name)
    name_primary_double_metaphone = selected_name_double_metaphone[0]
    name_secondary_double_metaphone = selected_name_double_metaphone[1]

    if name_secondary_double_metaphone == "":
        name_suggestions = db.session.query(PhoneticAlgorithmsCodes).filter(
            PhoneticAlgorithmsCodes.double_metaphone_primary == name_primary_double_metaphone).limit(10).all()
    else:
        name_suggestions = db.session.query(PhoneticAlgorithmsCodes).filter(
            or_(PhoneticAlgorithmsCodes.double_metaphone_primary == name_primary_double_metaphone,
                PhoneticAlgorithmsCodes.double_metaphone_secondary == name_secondary_double_metaphone)).limit(10).all()

    candidates = []
    for name_suggestion in name_suggestions:
        candidate_dict = flask_app.convert_name_suggestion_into_double_metaphone_result(name_suggestion)
        candidate_name = candidate_dict["candidate"]
        if candidate_name != selected_name:
            candidates.append(candidate_dict)

    result_dict['double_metaphone'] = candidates
    return result_dict


def nysiis_suggest_names(selected_name, result_dict):
    result_dict['nysiis'] = []
    selected_name_nysiis = jellyfish.nysiis(selected_name)

    name_suggestions = db.session.query(PhoneticAlgorithmsCodes).filter(
        PhoneticAlgorithmsCodes.nysiis == selected_name_nysiis).limit(10).all()

    candidates = []
    for name_suggestion in name_suggestions:
        candidate_dict = flask_app.convert_name_suggestion_into_nysiis_result(name_suggestion)
        candidate_name = candidate_dict["candidate"]
        if candidate_name != selected_name:
            candidates.append(candidate_dict)

    result_dict['nysiis'] = candidates
    return result_dict


def match_rating_codex_suggest_names(selected_name, result_dict):
    result_dict['match_rating_codex'] = []
    selected_name_mtc = jellyfish.match_rating_codex(selected_name)

    name_suggestions = db.session.query(PhoneticAlgorithmsCodes).filter(
        PhoneticAlgorithmsCodes.match_rating_codex == selected_name_mtc).limit(10).all()

    candidates = []
    for name_suggestion in name_suggestions:
        candidate_dict = flask_app.convert_name_suggestion_into_match_rating_codex_result(name_suggestion)
        candidate_name = candidate_dict["candidate"]
        if candidate_name != selected_name:
            candidates.append(candidate_dict)

    result_dict['match_rating_codex'] = candidates
    return result_dict


def convertSuggestionsToJson(suggestions):
    res = {}
    for algorithm in suggestions:
        if algorithm == 'index':
            continue
        elif algorithm == "name":
            res[algorithm] = suggestions[algorithm]
        else:
            algorithm_name = algorithms[algorithm]
            res[algorithm_name] = []
            for candidate in suggestions[algorithm]:
                res[algorithm_name].append(candidate["candidate"])
    return res


def createQuery(name, suggestions, user_likes, numOfQueryNames):

    def sort_by_likes_and_edit_distance(candidate, name=name, user_likes=user_likes):
        if not name or not candidate:
            return -math.inf
        if candidate["name"] in user_likes:  # by specific user likes
            return math.inf
        if candidate["user_rank"] != 0:  # by all users likes and dislikes
            return candidate["user_rank"]
        edit_dist = editdistance.eval(name.lower(), candidate["name"].lower())  # by edit distance
        return -edit_dist

    # top = 4
    top = int(numOfQueryNames) - 1
    all_results = {}

    for name_suggestions in suggestions:
        name_results = []
        for algorithm in name_suggestions:
            if algorithm != "name" and algorithm != "index":
                for suggestion in name_suggestions[algorithm]:
                    candidate_data = {
                        "name": suggestion["candidate"],
                        "user_rank": suggestion.get("user_rank", 0),
                    }
                    name_results.append(candidate_data)

        name_results.sort(key=sort_by_likes_and_edit_distance, reverse=True)
        all_results[name_suggestions['index']] = name_results

    splited_name = name.split()
    query = '"{}" OR '.format(name.title())
    for i in range(top):
        added_name =""
        for index in range(len(splited_name)):
            if index in all_results:
                result = all_results[index]
                candidate = result[i].get("name", '')
            else:
                candidate = splited_name[index]
            if added_name == "":
                added_name += "{}".format(candidate)
            else:
                added_name += " {}".format(candidate)
        if i < top - 1:
            query += '"{}" OR '.format(added_name)
        else:
            query += '"{}"'.format(added_name)
    return query


def create_results_dict(selected_name, key, index):
    result_dict = {
        'name': selected_name,
        'index': index}

    name_suggestions = db.session.query(NameSuggestion).filter(
        NameSuggestion.selected_name == selected_name).order_by(NameSuggestion.distance,
                                                                NameSuggestion.edit_distance,
                                                                NameSuggestion.rank).all()

    if len(name_suggestions) <= 0:
        return {}

    else:
        result_dict = spoken_name_2_vec_suggest_names(name_suggestions, result_dict)
        result_dict = family_trees_suggest_names(name_suggestions, result_dict)
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

    if key:
        user_name_search = db.session.query(Users).filter(Users.api_key == key).all()
        if len(user_name_search) == 0:
            return {"401": "Not Found"}, 401
        result_dict = convertSuggestionsToJson(result_dict)
        
    return result_dict
