from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from feature_extraction.feature_extractor import FeatureExtractor

# from text2speech_converter import Text2SpeechConverter

__author__ = "Aviad Elyashar"

# from flask_react.backend.feature_extraction.feature_extractor import FeatureExtractor


class FlaskApplication:
    def __init__(self):
        # app = Flask(__name__, template_folder='../templates', static_folder='../static')
        app = Flask(__name__)
        self._app = app

        self._app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///spoken_names_app.db?check_same_thread=False'
        db = SQLAlchemy(app)
        self._db = db

        # self._text2speech_converter = Text2SpeechConverter()
        # self._feature_extractor = FeatureExtractor()

    def get_app(self):
        return self._app

    def get_db(self):
        return self._db

    def get_text2speech_converter(self):
        return self._text2speech_converter

    def get_feature_extractor(self):
        return self._feature_extractor

    def convert_name_suggestion_into_spoken_name_2_vec_result(self, name_suggestion):
        candidate_dict = {}
        candidate_dict['candidate'] = name_suggestion.candidate
        candidate_dict['user_rank'] = name_suggestion.like + name_suggestion.dislike
        candidate_dict['like'] = name_suggestion.like
        candidate_dict['dislike'] = name_suggestion.dislike
        candidate_dict['edit_distance'] = name_suggestion.edit_distance
        candidate_dict['distance'] = name_suggestion.distance
        candidate_dict['rank'] = name_suggestion.rank
        candidate_dict['language'] = name_suggestion.language
        candidate_dict['add_rank'] = 0
        candidate_dict['remove_rank'] = 0
        return candidate_dict

    def convert_name_suggestion_into_family_tree_result(self, name_suggestion):
        candidate_dict = {}
        candidate_dict['candidate'] = name_suggestion.candidate
        candidate_dict['user_rank'] = name_suggestion.like + name_suggestion.dislike
        candidate_dict['like'] = name_suggestion.like
        candidate_dict['dislike'] = name_suggestion.dislike
        candidate_dict['edit_distance'] = name_suggestion.edit_distance
        candidate_dict['rank'] = name_suggestion.rank
        candidate_dict['language'] = name_suggestion.language
        candidate_dict['type_name'] = name_suggestion.type_name
        candidate_dict['add_rank'] = 0
        candidate_dict['remove_rank'] = 0
        return candidate_dict

    def convert_name_suggestion_into_soundex_result(self, name_suggestion):
        candidate_dict = {}
        candidate_dict['candidate'] = name_suggestion.name
        # candidate_dict['user_rank'] = name_suggestion.user_rank
        # candidate_dict['rank'] = name_suggestion.rank
        candidate_dict['soundex'] = name_suggestion.soundex
        # candidate_dict['add_rank'] = 0
        return candidate_dict

    def convert_name_suggestion_into_metaphone_result(self, name_suggestion):
        candidate_dict = {}
        candidate_dict['candidate'] = name_suggestion.name
        # candidate_dict['user_rank'] = name_suggestion.user_rank
        # candidate_dict['rank'] = name_suggestion.rank
        candidate_dict['metaphone'] = name_suggestion.metaphone
        # candidate_dict['add_rank'] = 0
        return candidate_dict

    def convert_name_suggestion_into_double_metaphone_result(self, name_suggestion):
        candidate_dict = {}
        candidate_dict['candidate'] = name_suggestion.name
        # candidate_dict['user_rank'] = name_suggestion.user_rank
        # candidate_dict['rank'] = name_suggestion.rank
        candidate_dict['double_metaphone_primary'] = name_suggestion.double_metaphone_primary
        candidate_dict['double_metaphone_secondary'] = name_suggestion.double_metaphone_secondary
        # candidate_dict['add_rank'] = 0
        return candidate_dict

    def convert_name_suggestion_into_nysiis_result(self, name_suggestion):
        candidate_dict = {}
        candidate_dict['candidate'] = name_suggestion.name
        # candidate_dict['user_rank'] = name_suggestion.user_rank
        # candidate_dict['rank'] = name_suggestion.rank
        candidate_dict['nysiis'] = name_suggestion.nysiis
        # candidate_dict['add_rank'] = 0
        return candidate_dict

    def convert_name_suggestion_into_match_rating_codex_result(self, name_suggestion):
        candidate_dict = {}
        candidate_dict['candidate'] = name_suggestion.name
        # candidate_dict['user_rank'] = name_suggestion.user_rank
        # candidate_dict['rank'] = name_suggestion.rank
        candidate_dict['match_rating_codex'] = name_suggestion.match_rating_codex
        # candidate_dict['add_rank'] = 0
        return candidate_dict
