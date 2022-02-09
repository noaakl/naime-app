
from flask_application import FlaskApplication

app = FlaskApplication()
api = app.get_app()
db = app.get_db()

class NameSuggestion(db.Model):
    selected_name = db.Column(db.TEXT, primary_key=True)
    type_name = db.Column(db.TEXT, primary_key=True)
    language = db.Column(db.TEXT, primary_key=True)
    candidate = db.Column(db.TEXT, primary_key=True)
    distance = db.Column(db.FLOAT, nullable=False)
    rank = db.Column(db.Integer, nullable=False)
    like = db.Column(db.Integer, nullable=False)
    dislike = db.Column(db.Integer, nullable=False)
    edit_distance = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return "<NameSuggestion(selected_name='%s',type_name='%s',language='%s', candidate='%s',distance='%s', user='%s', user_rank='%s', edit_distance='%s')>" % (
            self.selected_name, self.type_name, self.language, self.candidate, self.distance, self.rank,
            self.like, self.dislike, self.edit_distance)