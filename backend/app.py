# from flask import Flask, render_template, request, redirect
# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime
# from sqlalchemy import or_, and_
# from flask_application import FlaskApplication
# # from text2speech_converter import Text2SpeechConverter
# # from feature_extraction.pyAudioAnalysis.pyAudioAnalysis import MidTermFeatures as mtf
# from sqlalchemy import and_, or_
# import jellyfish
# import phonetics
# import json

# # import pandas as pd

# flask_app = FlaskApplication()
# app = flask_app.get_app()
# db = flask_app.get_db()


# # app = Flask(__name__)
# #
# # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///spoken_names_app.db'
# # db = SQLAlchemy(app)
# # text2speech_converter = Text2SpeechConverter()


# class UserSearch(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     selected_name = db.Column(db.String(100), nullable=False)
#     type_name = db.Column(db.String(15), nullable=False)
#     language = db.Column(db.String(15), nullable=False)
#     search_date = db.Column(db.DateTime, default=datetime.utcnow())

#     def __repr__(self):
#         return '<UserSearch %r>' % self.id


# class NameSuggestion(db.Model):
#     selected_name = db.Column(db.TEXT, primary_key=True)
#     type_name = db.Column(db.TEXT, primary_key=True)
#     language = db.Column(db.TEXT, primary_key=True)
#     candidate = db.Column(db.TEXT, primary_key=True)
#     distance = db.Column(db.FLOAT, nullable=False)
#     rank = db.Column(db.Integer, nullable=False)
#     edit_distance = db.Column(db.Integer, nullable=False)

#     def __repr__(self):
#         return "<NameSuggestion(selected_name='%s',type_name='%s',language='%s', candidate='%s',distance='%s', rank='%s', edit_distance='%s')>" % (
#             self.selected_name, self.type_name, self.language, self.candidate, self.distance, self.rank,
#             self.edit_distance)


# class PhoneticAlgorithmsCodes(db.Model):
#     name = db.Column(db.TEXT, primary_key=True)
#     soundex = db.Column(db.TEXT, nullable=False)
#     metaphone = db.Column(db.TEXT, nullable=False)
#     double_metaphone_primary = db.Column(db.TEXT, nullable=False)
#     double_metaphone_secondary = db.Column(db.TEXT, nullable=False)
#     nysiis = db.Column(db.TEXT, nullable=False)
#     match_rating_codex = db.Column(db.TEXT, nullable=False)

#     def __repr__(self):
#         return "<PhoneticAlgorithmsCodes(name='%s',soundex='%s',metaphone='%s', double_metaphone_primary='%s',double_metaphone_secondary='%s', nysiis='%s', matching_rating_codes='%s')>" % (
#             self.name, self.soundex, self.metaphone, self.double_metaphone_primary, self.double_metaphone_secondary,
#             self.nysiis, self.matching_rating_codes)


# def spoken_name_2_vec_suggest_names(selected_name, name_suggestions, result_dict):
#     result_dict['spoken_name_2_vec'] = []

#     candidates = []
#     distinct_candidate_set = set()
#     optional_candidates = []

#     for name_suggestion in name_suggestions:
#         name_type = name_suggestion.type_name
#         if name_type == "Sound":
#             optional_candidates.append(name_suggestion)

#     for name_suggestion in optional_candidates:
#         candidate = name_suggestion.candidate
#         distance_str = name_suggestion.distance
#         distance = float(distance_str)
#         if candidate not in distinct_candidate_set and len(distinct_candidate_set) < 10:
#             candidate_dict, candidates, distinct_candidate_set = convert_name_suggestion_into_result(name_suggestion,
#                                                                                                      candidate,
#                                                                                                      candidates,
#                                                                                                      distinct_candidate_set)
#             # candidate_dict = flask_app.convert_name_suggestion_into_result(name_suggestion)
#             # candidates.append(candidate_dict)
#             #
#             # distinct_candidate_set.add(candidate)

#         elif candidate not in distinct_candidate_set and distance == 0:
#             candidate_dict, candidates, distinct_candidate_set = convert_name_suggestion_into_result(
#                 name_suggestion, candidate, candidates, distinct_candidate_set)
#             # candidate_dict = flask_app.convert_name_suggestion_into_result(name_suggestion)
#             # candidates.append(candidate_dict)
#             #
#             # distinct_candidate_set.add(candidate)

#     result_dict['spoken_name_2_vec'] = candidates
#     return result_dict


# def family_trees_suggest_names(selected_name, name_suggestions, result_dict):
#     result_dict['family_trees'] = []

#     candidates = []
#     distinct_candidate_set = set()
#     family_trees_suggestions = []
#     for name_suggestion in name_suggestions:
#         name_type = name_suggestion.type_name
#         if name_type == "Family_Tree":
#             family_trees_suggestions.append(name_suggestion)

#     family_trees_suggestions.sort(key=lambda candidate: (candidate.rank, candidate.edit_distance))

#     for family_tree_suggestion in family_trees_suggestions:
#         candidate = family_tree_suggestion.candidate
#         if candidate not in distinct_candidate_set and len(distinct_candidate_set) < 10:
#             candidate_dict, candidates, distinct_candidate_set = convert_name_suggestion_into_result(
#                 family_tree_suggestion,
#                 candidate,
#                 candidates,
#                 distinct_candidate_set)

#     result_dict['family_trees'] = candidates
#     return result_dict


# def soundex_suggest_names(selected_name, result_dict):
#     result_dict['soundex'] = []
#     selected_name_soundex = jellyfish.soundex(selected_name)

#     name_suggestions = db.session.query(PhoneticAlgorithmsCodes).filter(
#         PhoneticAlgorithmsCodes.soundex == selected_name_soundex).limit(10).all()

#     candidates = []
#     for name_suggestion in name_suggestions:
#         candidate_dict = flask_app.convert_name_suggestion_into_soundex_result(name_suggestion)
#         candidate_name = candidate_dict["candidate"]
#         if candidate_name != selected_name:
#             candidates.append(candidate_dict)

#     result_dict['soundex'] = candidates
#     return result_dict


# def metaphone_suggest_names(selected_name, result_dict):
#     result_dict['metaphone'] = []
#     selected_name_metaphone = phonetics.metaphone(selected_name)

#     name_suggestions = db.session.query(PhoneticAlgorithmsCodes).filter(
#         PhoneticAlgorithmsCodes.metaphone == selected_name_metaphone).limit(10).all()

#     candidates = []
#     for name_suggestion in name_suggestions:
#         candidate_dict = flask_app.convert_name_suggestion_into_metaphone_result(name_suggestion)
#         candidate_name = candidate_dict["candidate"]
#         if candidate_name != selected_name:
#             candidates.append(candidate_dict)

#     result_dict['metaphone'] = candidates
#     return result_dict


# def double_metaphone_suggest_names(selected_name, result_dict):
#     result_dict['double_metaphone'] = []
#     selected_name_double_metaphone = phonetics.dmetaphone(selected_name)
#     name_primary_double_metaphone = selected_name_double_metaphone[0]
#     name_secondary_double_metaphone = selected_name_double_metaphone[1]

#     if name_secondary_double_metaphone == "":
#         name_suggestions = db.session.query(PhoneticAlgorithmsCodes).filter(
#             PhoneticAlgorithmsCodes.double_metaphone_primary == name_primary_double_metaphone).limit(10).all()
#     else:
#         name_suggestions = db.session.query(PhoneticAlgorithmsCodes).filter(
#             or_(PhoneticAlgorithmsCodes.double_metaphone_primary == name_primary_double_metaphone,
#                 PhoneticAlgorithmsCodes.double_metaphone_secondary == name_secondary_double_metaphone)).limit(10).all()

#     candidates = []
#     for name_suggestion in name_suggestions:
#         candidate_dict = flask_app.convert_name_suggestion_into_double_metaphone_result(name_suggestion)
#         candidate_name = candidate_dict["candidate"]
#         if candidate_name != selected_name:
#             candidates.append(candidate_dict)

#     result_dict['double_metaphone'] = candidates
#     return result_dict


# def nysiis_suggest_names(selected_name, result_dict):
#     result_dict['nysiis'] = []
#     selected_name_nysiis = jellyfish.nysiis(selected_name)

#     name_suggestions = db.session.query(PhoneticAlgorithmsCodes).filter(
#         PhoneticAlgorithmsCodes.nysiis == selected_name_nysiis).limit(10).all()

#     candidates = []
#     for name_suggestion in name_suggestions:
#         candidate_dict = flask_app.convert_name_suggestion_into_nysiis_result(name_suggestion)
#         candidate_name = candidate_dict["candidate"]
#         if candidate_name != selected_name:
#             candidates.append(candidate_dict)

#     result_dict['nysiis'] = candidates
#     return result_dict


# def match_rating_codex_suggest_names(selected_name, result_dict):
#     result_dict['match_rating_codex'] = []
#     selected_name_mtc = jellyfish.match_rating_codex(selected_name)

#     name_suggestions = db.session.query(PhoneticAlgorithmsCodes).filter(
#         PhoneticAlgorithmsCodes.match_rating_codex == selected_name_mtc).limit(10).all()

#     candidates = []
#     for name_suggestion in name_suggestions:
#         candidate_dict = flask_app.convert_name_suggestion_into_match_rating_codex_result(name_suggestion)
#         candidate_name = candidate_dict["candidate"]
#         if candidate_name != selected_name:
#             candidates.append(candidate_dict)

#     result_dict['match_rating_codex'] = candidates
#     return result_dict


# def convert_name_suggestion_into_result(name_suggestion, candidate, candidates, distinct_candidate_set):
#     candidate_dict = flask_app.convert_name_suggestion_into_spoken_name_2_vec_result(name_suggestion)
#     candidates.append(candidate_dict)

#     distinct_candidate_set.add(candidate)

#     return candidate_dict, candidates, distinct_candidate_set


# def name_not_exists_suggest_names(selected_name, result_dict):
#     target_language = "English"
#     text2speech_converter = flask_app.get_text2speech_converter()

#     text2speech_converter.convert_name_to_mp3(selected_name, target_language)
#     wav_path = text2speech_converter.convert_mp3_to_wav(selected_name, target_language)

#     feature_extractor = flask_app.get_feature_extractor()

#     names, euclidean_distances = feature_extractor.extract_audio_features(selected_name, target_language, wav_path)

#     name_suggestions = []
#     for name, euclidean_distance in zip(names, euclidean_distances):
#         name_suggestion = NameSuggestion()
#         name_suggestion.candidate = name
#         name_suggestion.distance = euclidean_distance
#         name_suggestions.append(name_suggestion)

#     result_dict = spoken_name_2_vec_suggest_names(selected_name, name_suggestions, result_dict)
#     result_dict = soundex_suggest_names(selected_name, result_dict)
#     result_dict = metaphone_suggest_names(selected_name, result_dict)

#     return result_dict


# # @app.route('/home2', methods=['POST', 'GET'])
# def home2():
#     name_suggestions = []
#     targeted_name = ""
#     if request.method == 'POST':
#         selected_name = request.form['selected_name']
#         targeted_name = selected_name
#         type_name = request.form['type_name']
#         language = request.form['language']
#         console.log(selected_name)
#         console.log(targeted_name)
#         console.log(type_name)
#         console.log(language)

#         # query = NameSuggestion.query.filter(and_(NameSuggestion.selected_name == selected_name,
#         #                                                      NameSuggestion.type_name == type_name,
#         #                                                      NameSuggestion.language == language))

#         name_suggestions = db.session.query(NameSuggestion).filter(and_(NameSuggestion.selected_name == selected_name,
#                                                                         NameSuggestion.type_name == type_name,
#                                                                         NameSuggestion.language == language)).all()

#         if len(name_suggestions) == 0:
#             text2speech_converter = flask_app.get_text2speech_converter()
#             text2speech_converter.convert_name_to_mp3(selected_name, language)
#             name_wav_path = text2speech_converter.convert_mp3_to_wav(selected_name)

#             feature_extractor = flask_app.get_feature_extractor()

#             feature_extractor.extract_audio_features(name_wav_path)

#         # name_suggestions = db.session.execute(query).all()

#         new_user_search = UserSearch(selected_name=selected_name, type_name=type_name, language=language)

#         try:
#             db.session.add(new_user_search)
#             db.session.commit()

#             return render_template('home2.html', name_suggestions=name_suggestions, targeted_name=targeted_name)
#             # return redirect('home.html')
#         except:
#             return 'There was an issue adding your task'

#     else:
#         # user_searches = UserSearch.query.order_by(UserSearch.search_date).all()
#         return render_template('home.html', name_suggestions=name_suggestions, targeted_name=targeted_name)


# # @app.route('/home', methods=['POST', 'GET'])
# def home():
#     name_suggestions = []
#     targeted_name = ""
#     if request.method == 'POST':
#         selected_name = request.form['selected_name']
#         targeted_name = selected_name
#         type_name = request.form['type_name']
#         language = request.form['language']

#         # query = NameSuggestion.query.filter(and_(NameSuggestion.selected_name == selected_name,
#         #                                                      NameSuggestion.type_name == type_name,
#         #                                                      NameSuggestion.language == language))

#         name_suggestions = db.session.query(NameSuggestion).filter(and_(NameSuggestion.selected_name == selected_name,
#                                                                         NameSuggestion.type_name == type_name,
#                                                                         NameSuggestion.language == language)).all()

#         if len(name_suggestions) == 0:
#             text2speech_converter = flask_app.get_text2speech_converter()
#             text2speech_converter.convert_name_to_mp3(selected_name, language)
#             name_wav_path = text2speech_converter.convert_mp3_to_wav(selected_name)

#             feature_extractor = flask_app.get_feature_extractor()

#             feature_extractor.extract_audio_features(name_wav_path)

#         # name_suggestions = db.session.execute(query).all()

#         new_user_search = UserSearch(selected_name=selected_name, type_name=type_name, language=language)

#         try:
#             db.session.add(new_user_search)
#             db.session.commit()

#             return render_template('home.html', name_suggestions=name_suggestions, targeted_name=targeted_name)
#             # return redirect('home.html')
#         except:
#             return 'There was an issue adding your task'

#     else:
#         # user_searches = UserSearch.query.order_by(UserSearch.search_date).all()
#         return render_template('home.html', name_suggestions=name_suggestions, targeted_name=targeted_name)


# # @app.route('/', methods=['POST', 'GET'])
# def index():
#     if request.method == 'POST':
#         selected_name = request.form['selected_name']
#         type_name = request.form['type_name']
#         language = request.form['language']

#         new_user_search = UserSearch(selected_name=selected_name, type_name=type_name, language=language)

#         try:
#             db.session.add(new_user_search)
#             db.session.commit()
#             return redirect('/')
#         except:
#             return 'There was an issue adding your task'

#     else:
#         user_searches = UserSearch.query.order_by(UserSearch.search_date).all()
#         return render_template('index.html', user_searches=user_searches)


# # @app.route('/members')
# def members():
#     return "Hello members"


# # @app.route('/members2')
# def members2():
#     return "Hello members2"


# # @app.route('/delete/<int:id>')
# def delete(id):
#     user_search_to_delete = UserSearch.query.get_or_404(id)

#     try:
#         db.session.delete(user_search_to_delete)
#         db.session.commit()
#         return redirect('/')

#     except:
#         return 'There was a problem deleting that task'


# # @app.route('/update/<int:id>', methods=['GET', 'POST'])
# def update(id):
#     user_search = UserSearch.query.get_or_404(id)
#     if request.method == 'POST':
#         selected_name = request.form['selected_name']
#         user_search.selected_name = selected_name

#         try:
#             db.session.commit()
#             return redirect('/')
#         except:
#             return 'There was an issue updating your user search'

#     else:
#         return render_template('update.html', user_search=user_search)


# # @app.route('/', methods=['GET'])
# # @app.route('/', methods=['GET'])
# # def make_render():
# #     return render_template('dashboard.html', result={}, targeted_name="")


# @app.route('/tal', methods=['GET'])
# def make_render():
#     return render_template('dashboard.html', result={}, targeted_name="")
#     # response_body = {
#     #     "name": "Nagato",
#     #     "about": "Hello! I'm a full stack developer that loves python and javascript"
#     # }
#     # return response_body


# @app.route('/nameList', methods=['GET'])
# def dashboard():
#     result_dict = {}
#     targeted_name = ""
#     if request.method == 'GET':
#         # selected_name = request.form['name']
#         selected_name = request.args.get('name')
#         selected_name = selected_name.capitalize()
#         targeted_name = selected_name

#         result_dict['name'] = selected_name

#         name_suggestions = db.session.query(NameSuggestion).filter(
#             NameSuggestion.selected_name == selected_name).order_by(NameSuggestion.distance,
#                                                                     NameSuggestion.edit_distance,
#                                                                     NameSuggestion.rank).all()

#         if len(name_suggestions) > 0:

#             result_dict = spoken_name_2_vec_suggest_names(selected_name, name_suggestions, result_dict)
#             result_dict = family_trees_suggest_names(selected_name, name_suggestions, result_dict)
#             result_dict = soundex_suggest_names(selected_name, result_dict)
#             result_dict = metaphone_suggest_names(selected_name, result_dict)
#             result_dict = double_metaphone_suggest_names(selected_name, result_dict)
#             result_dict = nysiis_suggest_names(selected_name, result_dict)
#             result_dict = match_rating_codex_suggest_names(selected_name, result_dict)

#             spoken_name_2_vec_candidates = [d['candidate'] for d in result_dict["spoken_name_2_vec"]]
#             family_trees_candidates = [d['candidate'] for d in result_dict["family_trees"]]
#             soundex_candidates = [d['candidate'] for d in result_dict["soundex"]]
#             metaphone_candidates = [d['candidate'] for d in result_dict["metaphone"]]
#             double_metaphone_candidates = [d['candidate'] for d in result_dict["double_metaphone"]]
#             nysiis_candidates = [d['candidate'] for d in result_dict["nysiis"]]
#             match_rating_codex_candidates = [d['candidate'] for d in result_dict["match_rating_codex"]]

#             other_candidates = list(set(soundex_candidates + metaphone_candidates + double_metaphone_candidates +
#                                         nysiis_candidates + match_rating_codex_candidates))

#             spoken_name_2_vec_exclusive_names = list(set(spoken_name_2_vec_candidates) - set(other_candidates))

#             for exclusive_name in spoken_name_2_vec_exclusive_names:
#                 spoken_name_suggestions = result_dict["spoken_name_2_vec"]
#                 for spoken_name_suggestion in spoken_name_suggestions:
#                     if spoken_name_suggestion["candidate"] == exclusive_name:
#                         spoken_name_suggestion["exclusive"] = 1
#                         break

#             family_trees_exclusive_names = list(set(family_trees_candidates) - set(other_candidates))

#             for exclusive_name in family_trees_exclusive_names:
#                 suggestions = result_dict["family_trees"]
#                 for suggestion in suggestions:
#                     if suggestion["candidate"] == exclusive_name:
#                         suggestion["exclusive"] = 1
#                         break


#         else:
#             result_dict = {}
#             # result_dict = name_not_exists_suggest_names(selected_name, result_dict)

#         new_user_search = UserSearch(selected_name=selected_name, type_name='', language="English")
#         db.session.add(new_user_search)
#         db.session.commit()

#     if targeted_name != "":
#         with open('{0}.json'.format(targeted_name), 'w') as json_file:
#             json.dump(result_dict, json_file)

#     return json.dumps(result_dict)
#     # return render_template('dashboard.html', result=result_dict, targeted_name=targeted_name)
#     # return render_template('index_naime.html', result=result_dict, targeted_name=targeted_name)


# if __name__ == '__main__':
#     app.run(host='localhost', port=3000, debug=True)
#     # app.run(debug=True, host="10.0.0.112", port=8112)
