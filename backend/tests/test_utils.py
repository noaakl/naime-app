from unittest import TestCase
from unittest.mock import MagicMock, Mock

from NameSuggestion import NameSuggestion
from utils import spoken_name_2_vec_suggest_names, family_trees_suggest_names, soundex_suggest_names, \
    metaphone_suggest_names, double_metaphone_suggest_names, nysiis_suggest_names, match_rating_codex_suggest_names, \
    convert_name_suggestion_into_result, convertSuggestionsToJson, createQuery, create_results_dict


class TestSpokenName2vec(TestCase):

    def test_spoken_name_2_vec_suggest_names(self):
        result_dict = {
            'name': 'noa',
            'index': '0'}
        name_suggestion = NameSuggestion()
        name_suggestion.selected_name = 'noa'
        name_suggestion.type_name = 'Sound'
        name_suggestion.language = 'en'
        name_suggestion.candidate = 'noah'
        name_suggestion.distance = '-1.0'
        name_suggestion.rank = '-1'
        name_suggestion.edit_distance = '1.0'
        result_dict = spoken_name_2_vec_suggest_names([name_suggestion], result_dict)
        self.assertEqual(result_dict['spoken_name_2_vec'],
                         [{'add_rank': 0,
                           'candidate': 'noah',
                           'distance': '-1.0',
                           'edit_distance': '1.0',
                           'language': 'en',
                           'rank': '-1',
                           'remove_rank': 0}], "not same suggestions")

    def test_empty_spoken_name_2_vec_suggest_names(self):
        result_dict = {
            'name': 'noa',
            'index': '0'}
        name_suggestion = NameSuggestion()
        name_suggestion.selected_name = 'noa'
        name_suggestion.type_name = 'Double_Metaphone_Suggestion'
        name_suggestion.language = 'en'
        name_suggestion.candidate = 'noah'
        name_suggestion.distance = '-1.0'
        name_suggestion.rank = '-1'
        name_suggestion.edit_distance = '1.0'
        result_dict = spoken_name_2_vec_suggest_names([name_suggestion], result_dict)
        self.assertEqual(result_dict['spoken_name_2_vec'], [], "suggestions should be empty")


class TestGraft(TestCase):

    def test_family_trees_suggest_names(self):
        result_dict = {
            'name': 'noa',
            'index': '0'}
        name_suggestion = NameSuggestion()
        name_suggestion.selected_name = 'noa'
        name_suggestion.type_name = 'Family_Tree'
        name_suggestion.language = 'en'
        name_suggestion.candidate = 'noah'
        name_suggestion.distance = '-1.0'
        name_suggestion.rank = '-1'
        name_suggestion.edit_distance = '1.0'
        result_dict = family_trees_suggest_names([name_suggestion], result_dict)
        self.assertEqual(result_dict['family_trees'],
                         [{'add_rank': 0,
                           'candidate': 'noah',
                           'distance': '-1.0',
                           'edit_distance': '1.0',
                           'language': 'en',
                           'rank': '-1',
                           'remove_rank': 0}], "not same suggestions")

    def test_empty_family_trees_suggest_names(self):
        result_dict = {
            'name': 'noa',
            'index': '0'}
        name_suggestion = NameSuggestion()
        name_suggestion.selected_name = 'noa'
        name_suggestion.type_name = 'Double_Metaphone_Suggestion'
        name_suggestion.language = 'en'
        name_suggestion.candidate = 'noah'
        name_suggestion.distance = '-1.0'
        name_suggestion.rank = '-1'
        name_suggestion.edit_distance = '1.0'
        result_dict = family_trees_suggest_names([name_suggestion], result_dict)
        self.assertEqual(result_dict['family_trees'], [], "suggestions should be empty")


class TestPhonetics(TestCase):

    def test_soundex_suggest_names(self):
        result_dict = {
            'name': 'tal',
            'index': '0'}
        result_dict = soundex_suggest_names('tal', result_dict)
        self.assertEqual(result_dict['soundex'], [{'candidate': 'Taaliah', 'soundex': 'T400'},
                                                  {'candidate': 'Taaliyah', 'soundex': 'T400'},
                                                  {'candidate': 'Taela', 'soundex': 'T400'},
                                                  {'candidate': 'Taelee', 'soundex': 'T400'},
                                                  {'candidate': 'Tahlaya', 'soundex': 'T400'},
                                                  {'candidate': 'Tahlea', 'soundex': 'T400'},
                                                  {'candidate': 'Tahleah', 'soundex': 'T400'},
                                                  {'candidate': 'Tahlee', 'soundex': 'T400'},
                                                  {'candidate': 'Tahlia', 'soundex': 'T400'},
                                                  {'candidate': 'Tahliah', 'soundex': 'T400'}], "not same suggestions")

    def test_metaphone_suggest_names(self):
        result_dict = {
            'name': 'tal',
            'index': '0'}
        result_dict = metaphone_suggest_names('tal', result_dict)
        self.assertEqual(result_dict['metaphone'], [{'candidate': 'Dael', 'metaphone': 'TL'},
                                                    {'candidate': 'Daela', 'metaphone': 'TL'},
                                                    {'candidate': 'Daely', 'metaphone': 'TL'},
                                                    {'candidate': 'Dahl', 'metaphone': 'TL'},
                                                    {'candidate': 'Dahlia', 'metaphone': 'TL'},
                                                    {'candidate': 'Dahliah', 'metaphone': 'TL'},
                                                    {'candidate': 'Dahlya', 'metaphone': 'TL'},
                                                    {'candidate': 'Dail', 'metaphone': 'TL'},
                                                    {'candidate': 'Daila', 'metaphone': 'TL'},
                                                    {'candidate': 'Dailee', 'metaphone': 'TL'}], "not same suggestions")

    def test_double_metaphone_suggest_names(self):
        result_dict = {
            'name': 'tal',
            'index': '0'}
        result_dict = double_metaphone_suggest_names('tal', result_dict)
        self.assertEqual(result_dict['double_metaphone'], [{'candidate': 'Dael',
                                                            'double_metaphone_primary': 'TL',
                                                            'double_metaphone_secondary': ''},
                                                           {'candidate': 'Daela',
                                                            'double_metaphone_primary': 'TL',
                                                            'double_metaphone_secondary': ''},
                                                           {'candidate': 'Daely',
                                                            'double_metaphone_primary': 'TL',
                                                            'double_metaphone_secondary': ''},
                                                           {'candidate': 'Dahl',
                                                            'double_metaphone_primary': 'TL',
                                                            'double_metaphone_secondary': ''},
                                                           {'candidate': 'Dahlia',
                                                            'double_metaphone_primary': 'TL',
                                                            'double_metaphone_secondary': ''},
                                                           {'candidate': 'Dahliah',
                                                            'double_metaphone_primary': 'TL',
                                                            'double_metaphone_secondary': ''},
                                                           {'candidate': 'Dahlya',
                                                            'double_metaphone_primary': 'TL',
                                                            'double_metaphone_secondary': ''},
                                                           {'candidate': 'Dail',
                                                            'double_metaphone_primary': 'TL',
                                                            'double_metaphone_secondary': ''},
                                                           {'candidate': 'Daila',
                                                            'double_metaphone_primary': 'TL',
                                                            'double_metaphone_secondary': ''},
                                                           {'candidate': 'Dailee',
                                                            'double_metaphone_primary': 'TL',
                                                            'double_metaphone_secondary': ''}], "not same suggestions")

    def test_nysiis_suggest_names(self):
        result_dict = {
            'name': 'tal',
            'index': '0'}
        result_dict = nysiis_suggest_names('tal', result_dict)
        self.assertEqual(result_dict['nysiis'], [{'candidate': 'Taaliah', 'nysiis': 'TAL'},
                                                 {'candidate': 'Taela', 'nysiis': 'TAL'},
                                                 {'candidate': 'Tahlea', 'nysiis': 'TAL'},
                                                 {'candidate': 'Tahleah', 'nysiis': 'TAL'},
                                                 {'candidate': 'Tahlia', 'nysiis': 'TAL'},
                                                 {'candidate': 'Tahliah', 'nysiis': 'TAL'},
                                                 {'candidate': 'Taila', 'nysiis': 'TAL'},
                                                 {'candidate': 'Tailah', 'nysiis': 'TAL'},
                                                 {'candidate': 'Tal', 'nysiis': 'TAL'},
                                                 {'candidate': 'Talah', 'nysiis': 'TAL'}], "not same suggestions")

    def test_match_rating_codex_suggest_names(self):
        result_dict = {
            'name': 'tal',
            'index': '0'}
        result_dict = match_rating_codex_suggest_names('tal', result_dict)
        self.assertEqual(result_dict['match_rating_codex'], [{'candidate': 'Taela', 'match_rating_codex': 'TL'},
                                                             {'candidate': 'Taelee', 'match_rating_codex': 'TL'},
                                                             {'candidate': 'Taila', 'match_rating_codex': 'TL'},
                                                             {'candidate': 'Tal', 'match_rating_codex': 'TL'},
                                                             {'candidate': 'Talea', 'match_rating_codex': 'TL'},
                                                             {'candidate': 'Talee', 'match_rating_codex': 'TL'},
                                                             {'candidate': 'Taleea', 'match_rating_codex': 'TL'},
                                                             {'candidate': 'Taleia', 'match_rating_codex': 'TL'},
                                                             {'candidate': 'Talia', 'match_rating_codex': 'TL'},
                                                             {'candidate': 'Talie', 'match_rating_codex': 'TL'}],
                         "not same suggestions")


class TestHelpFunctions(TestCase):

    def test_convert_name_suggestion_into_result(self):
        name_suggestion1 = NameSuggestion()
        name_suggestion1.selected_name = 'noa'
        name_suggestion1.type_name = 'Family_Tree'
        name_suggestion1.language = 'en'
        name_suggestion1.candidate = 'noah'
        name_suggestion1.distance = '-1.0'
        name_suggestion1.rank = '-1'
        name_suggestion1.edit_distance = '1.0'

        name_suggestion2 = NameSuggestion()
        name_suggestion2.selected_name = 'noa'
        name_suggestion2.type_name = 'Double_Metaphone_Suggestion'
        name_suggestion2.language = 'en'
        name_suggestion2.candidate = 'noah'
        name_suggestion2.distance = '-1.0'
        name_suggestion2.rank = '-1'
        name_suggestion2.edit_distance = '1.0'

        distinct_candidate_set = set()

        candidate_dict, candidates, distinct_candidate_set = convert_name_suggestion_into_result(name_suggestion1,
                                                                                                 name_suggestion1.candidate,
                                                                                                 [],
                                                                                                 distinct_candidate_set)

        candidate_dict, candidates, distinct_candidate_set = convert_name_suggestion_into_result(name_suggestion2,
                                                                                                 name_suggestion2.candidate,
                                                                                                 candidates,
                                                                                                 distinct_candidate_set)
        self.assertEqual(candidate_dict, {'add_rank': 0,
                                          'candidate': 'noah',
                                          'distance': '-1.0',
                                          'edit_distance': '1.0',
                                          'language': 'en',
                                          'rank': '-1',
                                          'remove_rank': 0}, "not same candidate_dict")
        self.assertEqual(candidates, [{'add_rank': 0,
                                       'candidate': 'noah',
                                       'distance': '-1.0',
                                       'edit_distance': '1.0',
                                       'language': 'en',
                                       'rank': '-1',
                                       'remove_rank': 0},
                                      {'add_rank': 0,
                                       'candidate': 'noah',
                                       'distance': '-1.0',
                                       'edit_distance': '1.0',
                                       'language': 'en',
                                       'rank': '-1',
                                       'remove_rank': 0}], "not same candidates")
        self.assertEqual(distinct_candidate_set, {'noah'}, "not same distinct_candidate_set")

    def test_convert_suggestions_to_json(self):
        result_dict = {'index': '0',
                       'name': 'noa',
                       'spoken_name_2_vec': [{'add_rank': 0,
                                              'candidate': 'noah',
                                              'distance': '-1.0',
                                              'edit_distance': '1.0',
                                              'language': 'en',
                                              'rank': '-1',
                                              'remove_rank': 0}]}
        json_object = convertSuggestionsToJson(result_dict)
        self.assertEqual(json_object, {'SpokenName2Vec': ['noah'], 'name': 'noa'},
                         "not same json")

    def test_create_query(self):
        name = 'Thomas'
        suggestions = [{'name': 'Thomas', 'index': 0, 'spoken_name_2_vec': [
            {'candidate': 'Thamas', 'edit_distance': '1', 'distance': 0, 'rank': 1, 'language': 'en', 'add_rank': 0,
             'remove_rank': 0},
            {'candidate': 'Thomass', 'edit_distance': '1', 'distance': 0, 'rank': 3, 'language': 'en', 'add_rank': 0,
             'remove_rank': 0, 'exclusive': 1},
            {'candidate': 'Thomos', 'edit_distance': '1', 'distance': 0, 'rank': 4, 'language': 'en', 'add_rank': 0,
             'remove_rank': 0}], 'family_trees': [
            {'candidate': 'Jonas', 'edit_distance': '3.0', 'distance': -1, 'rank': 9, 'language': 'en', 'add_rank': 0,
             'remove_rank': 0, 'exclusive': 1},
            {'candidate': 'Tamar', 'edit_distance': '3.0', 'distance': -1, 'rank': 6, 'language': 'en', 'add_rank': 0,
             'remove_rank': 0, 'exclusive': 1},
            {'candidate': 'Tammes', 'edit_distance': '3.0', 'distance': -1, 'rank': 3, 'language': 'en', 'add_rank': 0,
             'remove_rank': 0, 'exclusive': 1},
            {'candidate': 'Thomassn', 'edit_distance': '2.0', 'distance': -1, 'rank': 8, 'language': 'en',
             'add_rank': 0, 'remove_rank': 0, 'exclusive': 1},
            {'candidate': 'Thomasson', 'edit_distance': '3.0', 'distance': -1, 'rank': 6, 'language': 'en',
             'add_rank': 0, 'remove_rank': 0, 'exclusive': 1},
            {'candidate': 'Thompson', 'edit_distance': '3.0', 'distance': -1, 'rank': 9, 'language': 'en',
             'add_rank': 0, 'remove_rank': 0, 'exclusive': 1},
            {'candidate': 'Thomsen', 'edit_distance': '3.0', 'distance': -1, 'rank': 6, 'language': 'en', 'add_rank': 0,
             'remove_rank': 0, 'exclusive': 1},
            {'candidate': 'Tom', 'edit_distance': '3.0', 'distance': -1, 'rank': 6, 'language': 'en', 'add_rank': 0,
             'remove_rank': 0, 'exclusive': 1},
            {'candidate': 'Tomas', 'edit_distance': '1.0', 'distance': -1, 'rank': 1, 'language': 'en', 'add_rank': 0,
             'remove_rank': 0, 'exclusive': 1},
            {'candidate': 'Tommy', 'edit_distance': '3.0', 'distance': -1, 'rank': 6, 'language': 'en', 'add_rank': 0,
             'remove_rank': 0, 'exclusive': 1}], 'soundex': [{'candidate': 'Tahnesha', 'soundex': 'T520'},
                                                             {'candidate': 'Tahnisha', 'soundex': 'T520'},
                                                             {'candidate': 'Tamacia', 'soundex': 'T520'},
                                                             {'candidate': 'Tamaica', 'soundex': 'T520'},
                                                             {'candidate': 'Tamaka', 'soundex': 'T520'},
                                                             {'candidate': 'Tamas', 'soundex': 'T520'},
                                                             {'candidate': 'Tamasa', 'soundex': 'T520'},
                                                             {'candidate': 'Tamaso', 'soundex': 'T520'},
                                                             {'candidate': 'Tamassa', 'soundex': 'T520'},
                                                             {'candidate': 'Tamasso', 'soundex': 'T520'}],
                        'metaphone': [{'candidate': 'Damacia', 'metaphone': 'TMS'},
                                      {'candidate': 'Damacio', 'metaphone': 'TMS'},
                                      {'candidate': 'Damas', 'metaphone': 'TMS'},
                                      {'candidate': 'Damase', 'metaphone': 'TMS'},
                                      {'candidate': 'Damasia', 'metaphone': 'TMS'},
                                      {'candidate': 'Damasio', 'metaphone': 'TMS'},
                                      {'candidate': 'Damasse', 'metaphone': 'TMS'},
                                      {'candidate': 'Damazi', 'metaphone': 'TMS'},
                                      {'candidate': 'Damazio', 'metaphone': 'TMS'},
                                      {'candidate': 'Damazy', 'metaphone': 'TMS'}], 'double_metaphone': [
                {'candidate': 'Damacia', 'double_metaphone_primary': 'TMS', 'double_metaphone_secondary': 'TMX'},
                {'candidate': 'Damacio', 'double_metaphone_primary': 'TMS', 'double_metaphone_secondary': 'TMX'},
                {'candidate': 'Damas', 'double_metaphone_primary': 'TMS', 'double_metaphone_secondary': ''},
                {'candidate': 'Damase', 'double_metaphone_primary': 'TMS', 'double_metaphone_secondary': ''},
                {'candidate': 'Damasia', 'double_metaphone_primary': 'TMS', 'double_metaphone_secondary': 'TMX'},
                {'candidate': 'Damasio', 'double_metaphone_primary': 'TMS', 'double_metaphone_secondary': 'TMX'},
                {'candidate': 'Damasse', 'double_metaphone_primary': 'TMS', 'double_metaphone_secondary': ''},
                {'candidate': 'Damazi', 'double_metaphone_primary': 'TMS', 'double_metaphone_secondary': ''},
                {'candidate': 'Damazio', 'double_metaphone_primary': 'TMS', 'double_metaphone_secondary': ''},
                {'candidate': 'Damazy', 'double_metaphone_primary': 'TMS', 'double_metaphone_secondary': ''}],
                        'nysiis': [{'candidate': 'Taana', 'nysiis': 'TAN'}, {'candidate': 'Taeon', 'nysiis': 'TAN'},
                                   {'candidate': 'Tahmia', 'nysiis': 'TAN'}, {'candidate': 'Tahna', 'nysiis': 'TAN'},
                                   {'candidate': 'Tahni', 'nysiis': 'TAN'}, {'candidate': 'Tahnia', 'nysiis': 'TAN'},
                                   {'candidate': 'Taiana', 'nysiis': 'TAN'}, {'candidate': 'Taim', 'nysiis': 'TAN'},
                                   {'candidate': 'Taima', 'nysiis': 'TAN'}, {'candidate': 'Taina', 'nysiis': 'TAN'}],
                        'match_rating_codex': [{'candidate': 'Thamas', 'match_rating_codex': 'THMS'},
                                               {'candidate': 'Thoams', 'match_rating_codex': 'THMS'},
                                               {'candidate': 'Thomaas', 'match_rating_codex': 'THMS'},
                                               {'candidate': 'Thomasa', 'match_rating_codex': 'THMS'},
                                               {'candidate': 'Thomasee', 'match_rating_codex': 'THMS'},
                                               {'candidate': 'Thomasia', 'match_rating_codex': 'THMS'},
                                               {'candidate': 'Thomes', 'match_rating_codex': 'THMS'},
                                               {'candidate': 'Thomos', 'match_rating_codex': 'THMS'},
                                               {'candidate': 'Thomsia', 'match_rating_codex': 'THMS'}]}]
        userLikes = ['Thamas']
        numOfQueryNames = 5
        query = createQuery(name, suggestions, userLikes, numOfQueryNames)
        self.assertEqual(query, '"Thomas" OR "Thamas" OR "Thamas" OR "Thomass" OR "Thomos"',
                         "not same query")

    def test_create_results_dict_with_key(self):
        selected_name = 'Thomas'
        index = 0
        key = 'JUgdURmFEXTJ8tzgO3riZw'  # TODO: change
        result_dict = create_results_dict(selected_name, key, index)
        self.assertEqual(result_dict, {'Double Metaphone': ['Damacia',
                                                            'Damacio',
                                                            'Damas',
                                                            'Damase',
                                                            'Damasia',
                                                            'Damasio',
                                                            'Damasse',
                                                            'Damazi',
                                                            'Damazio',
                                                            'Damazy'],
                                       'GRAFT': ['Tomas',
                                                 'Tammes',
                                                 'Tamar',
                                                 'Thomasson',
                                                 'Thomsen',
                                                 'Tom',
                                                 'Tommy',
                                                 'Thomassn',
                                                 'Jonas',
                                                 'Thompson'],
                                       'Match Rating Codex': ['Thamas',
                                                              'Thomaas',
                                                              'Thomasa',
                                                              'Thomasia',
                                                              'Thomos',
                                                              'Thomsia',
                                                              'Thoams',
                                                              'Thomasee',
                                                              'Thomes'],
                                       'Metaphone': ['Damacia',
                                                     'Damacio',
                                                     'Damas',
                                                     'Damase',
                                                     'Damasia',
                                                     'Damasio',
                                                     'Damasse',
                                                     'Damazi',
                                                     'Damazio',
                                                     'Damazy'],
                                       'Nysiis': ['Taana',
                                                  'Taeon',
                                                  'Tahmia',
                                                  'Tahna',
                                                  'Tahni',
                                                  'Tahnia',
                                                  'Taiana',
                                                  'Taim',
                                                  'Taima',
                                                  'Taina'],
                                       'Soundex': ['Tahnesha',
                                                   'Tahnisha',
                                                   'Tamacia',
                                                   'Tamaica',
                                                   'Tamaka',
                                                   'Tamas',
                                                   'Tamasa',
                                                   'Tamaso',
                                                   'Tamassa',
                                                   'Tamasso'],
                                       'SpokenName2Vec': ['Thamas', 'Thomass', 'Thomos'],
                                       'name': 'Thomas'},
                         "not same query")

    def test_create_results_dict_without_key(self):
        selected_name = 'Thomas'
        index = 0
        # key = 'JUgdURmFEXTJ8tzgO3riZw'  # TODO: change
        key = None
        result_dict = create_results_dict(selected_name, key, index)
        self.assertEqual(result_dict, {'double_metaphone': [{'candidate': 'Damacia',
                                                             'double_metaphone_primary': 'TMS',
                                                             'double_metaphone_secondary': 'TMX'},
                                                            {'candidate': 'Damacio',
                                                             'double_metaphone_primary': 'TMS',
                                                             'double_metaphone_secondary': 'TMX'},
                                                            {'candidate': 'Damas',
                                                             'double_metaphone_primary': 'TMS',
                                                             'double_metaphone_secondary': ''},
                                                            {'candidate': 'Damase',
                                                             'double_metaphone_primary': 'TMS',
                                                             'double_metaphone_secondary': ''},
                                                            {'candidate': 'Damasia',
                                                             'double_metaphone_primary': 'TMS',
                                                             'double_metaphone_secondary': 'TMX'},
                                                            {'candidate': 'Damasio',
                                                             'double_metaphone_primary': 'TMS',
                                                             'double_metaphone_secondary': 'TMX'},
                                                            {'candidate': 'Damasse',
                                                             'double_metaphone_primary': 'TMS',
                                                             'double_metaphone_secondary': ''},
                                                            {'candidate': 'Damazi',
                                                             'double_metaphone_primary': 'TMS',
                                                             'double_metaphone_secondary': ''},
                                                            {'candidate': 'Damazio',
                                                             'double_metaphone_primary': 'TMS',
                                                             'double_metaphone_secondary': ''},
                                                            {'candidate': 'Damazy',
                                                             'double_metaphone_primary': 'TMS',
                                                             'double_metaphone_secondary': ''}],
                                       'family_trees': [{'add_rank': 0,
                                                         'candidate': 'Tomas',
                                                         'distance': -1.0,
                                                         'edit_distance': '1.0',
                                                         'exclusive': 1,
                                                         'language': 'en',
                                                         'rank': 1,
                                                         'remove_rank': 0},
                                                        {'add_rank': 0,
                                                         'candidate': 'Tammes',
                                                         'distance': -1.0,
                                                         'edit_distance': '3.0',
                                                         'exclusive': 1,
                                                         'language': 'en',
                                                         'rank': 3,
                                                         'remove_rank': 0},
                                                        {'add_rank': 0,
                                                         'candidate': 'Tamar',
                                                         'distance': -1.0,
                                                         'edit_distance': '3.0',
                                                         'exclusive': 1,
                                                         'language': 'en',
                                                         'rank': 6,
                                                         'remove_rank': 0},
                                                        {'add_rank': 0,
                                                         'candidate': 'Thomasson',
                                                         'distance': -1.0,
                                                         'edit_distance': '3.0',
                                                         'exclusive': 1,
                                                         'language': 'en',
                                                         'rank': 6,
                                                         'remove_rank': 0},
                                                        {'add_rank': 0,
                                                         'candidate': 'Thomsen',
                                                         'distance': -1.0,
                                                         'edit_distance': '3.0',
                                                         'exclusive': 1,
                                                         'language': 'en',
                                                         'rank': 6,
                                                         'remove_rank': 0},
                                                        {'add_rank': 0,
                                                         'candidate': 'Tom',
                                                         'distance': -1.0,
                                                         'edit_distance': '3.0',
                                                         'exclusive': 1,
                                                         'language': 'en',
                                                         'rank': 6,
                                                         'remove_rank': 0},
                                                        {'add_rank': 0,
                                                         'candidate': 'Tommy',
                                                         'distance': -1.0,
                                                         'edit_distance': '3.0',
                                                         'exclusive': 1,
                                                         'language': 'en',
                                                         'rank': 6,
                                                         'remove_rank': 0},
                                                        {'add_rank': 0,
                                                         'candidate': 'Thomassn',
                                                         'distance': -1.0,
                                                         'edit_distance': '2.0',
                                                         'exclusive': 1,
                                                         'language': 'en',
                                                         'rank': 8,
                                                         'remove_rank': 0},
                                                        {'add_rank': 0,
                                                         'candidate': 'Jonas',
                                                         'distance': -1.0,
                                                         'edit_distance': '3.0',
                                                         'exclusive': 1,
                                                         'language': 'en',
                                                         'rank': 9,
                                                         'remove_rank': 0},
                                                        {'add_rank': 0,
                                                         'candidate': 'Thompson',
                                                         'distance': -1.0,
                                                         'edit_distance': '3.0',
                                                         'exclusive': 1,
                                                         'language': 'en',
                                                         'rank': 9,
                                                         'remove_rank': 0}],
                                       'index': 0,
                                       'match_rating_codex': [{'candidate': 'Thamas', 'match_rating_codex': 'THMS'},
                                                              {'candidate': 'Thomaas', 'match_rating_codex': 'THMS'},
                                                              {'candidate': 'Thomasa', 'match_rating_codex': 'THMS'},
                                                              {'candidate': 'Thomasia', 'match_rating_codex': 'THMS'},
                                                              {'candidate': 'Thomos', 'match_rating_codex': 'THMS'},
                                                              {'candidate': 'Thomsia', 'match_rating_codex': 'THMS'},
                                                              {'candidate': 'Thoams', 'match_rating_codex': 'THMS'},
                                                              {'candidate': 'Thomasee', 'match_rating_codex': 'THMS'},
                                                              {'candidate': 'Thomes', 'match_rating_codex': 'THMS'}],
                                       'metaphone': [{'candidate': 'Damacia', 'metaphone': 'TMS'},
                                                     {'candidate': 'Damacio', 'metaphone': 'TMS'},
                                                     {'candidate': 'Damas', 'metaphone': 'TMS'},
                                                     {'candidate': 'Damase', 'metaphone': 'TMS'},
                                                     {'candidate': 'Damasia', 'metaphone': 'TMS'},
                                                     {'candidate': 'Damasio', 'metaphone': 'TMS'},
                                                     {'candidate': 'Damasse', 'metaphone': 'TMS'},
                                                     {'candidate': 'Damazi', 'metaphone': 'TMS'},
                                                     {'candidate': 'Damazio', 'metaphone': 'TMS'},
                                                     {'candidate': 'Damazy', 'metaphone': 'TMS'}],
                                       'name': 'Thomas',
                                       'nysiis': [{'candidate': 'Taana', 'nysiis': 'TAN'},
                                                  {'candidate': 'Taeon', 'nysiis': 'TAN'},
                                                  {'candidate': 'Tahmia', 'nysiis': 'TAN'},
                                                  {'candidate': 'Tahna', 'nysiis': 'TAN'},
                                                  {'candidate': 'Tahni', 'nysiis': 'TAN'},
                                                  {'candidate': 'Tahnia', 'nysiis': 'TAN'},
                                                  {'candidate': 'Taiana', 'nysiis': 'TAN'},
                                                  {'candidate': 'Taim', 'nysiis': 'TAN'},
                                                  {'candidate': 'Taima', 'nysiis': 'TAN'},
                                                  {'candidate': 'Taina', 'nysiis': 'TAN'}],
                                       'soundex': [{'candidate': 'Tahnesha', 'soundex': 'T520'},
                                                   {'candidate': 'Tahnisha', 'soundex': 'T520'},
                                                   {'candidate': 'Tamacia', 'soundex': 'T520'},
                                                   {'candidate': 'Tamaica', 'soundex': 'T520'},
                                                   {'candidate': 'Tamaka', 'soundex': 'T520'},
                                                   {'candidate': 'Tamas', 'soundex': 'T520'},
                                                   {'candidate': 'Tamasa', 'soundex': 'T520'},
                                                   {'candidate': 'Tamaso', 'soundex': 'T520'},
                                                   {'candidate': 'Tamassa', 'soundex': 'T520'},
                                                   {'candidate': 'Tamasso', 'soundex': 'T520'}],
                                       'spoken_name_2_vec': [{'add_rank': 0,
                                                              'candidate': 'Thamas',
                                                              'distance': 0.0,
                                                              'edit_distance': '1',
                                                              'language': 'en',
                                                              'rank': 1,
                                                              'remove_rank': 0},
                                                             {'add_rank': 0,
                                                              'candidate': 'Thomass',
                                                              'distance': 0.0,
                                                              'edit_distance': '1',
                                                              'exclusive': 1,
                                                              'language': 'en',
                                                              'rank': 3,
                                                              'remove_rank': 0},
                                                             {'add_rank': 0,
                                                              'candidate': 'Thomos',
                                                              'distance': 0.0,
                                                              'edit_distance': '1',
                                                              'language': 'en',
                                                              'rank': 4,
                                                              'remove_rank': 0}]},
                         "not same result dict")

    def test_create_empty_results_dict(self):
        selected_name = 'N'
        index = 0
        key = None
        result_dict = create_results_dict(selected_name, key, index)
        self.assertEqual(result_dict, {}, "not empty query")
