from PhoneticAlgorithmsCodes import PhoneticAlgorithmsCodes
from flask_application import FlaskApplication
import jellyfish
import phonetics

from datetime import datetime
flask_app = FlaskApplication()
app = flask_app.get_app()
db = flask_app.get_db()


def spoken_name_2_vec_suggest_names(selected_name, name_suggestions, result_dict):
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
            # candidate_dict = flask_app.convert_name_suggestion_into_result(name_suggestion)
            # candidates.append(candidate_dict)
            #
            # distinct_candidate_set.add(candidate)

        elif not candidate in distinct_candidate_set and distance == 0:
            candidate_dict, candidates, distinct_candidate_set = convert_name_suggestion_into_result(
                name_suggestion, candidate, candidates, distinct_candidate_set)
            # candidate_dict = flask_app.convert_name_suggestion_into_result(name_suggestion)
            # candidates.append(candidate_dict)
            #
            # distinct_candidate_set.add(candidate)

    result_dict['spoken_name_2_vec'] = candidates
    return result_dict


def convert_name_suggestion_into_result(name_suggestion, candidate, candidates, distinct_candidate_set):
    candidate_dict = flask_app.convert_name_suggestion_into_spoken_name_2_vec_result(name_suggestion)
    candidates.append(candidate_dict)

    distinct_candidate_set.add(candidate)

    return candidate_dict, candidates, distinct_candidate_set


def family_trees_suggest_names(selected_name, name_suggestions, result_dict):
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