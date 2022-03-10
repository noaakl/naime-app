
from flask_application import FlaskApplication

app = FlaskApplication()
api = app.get_app()
db = app.get_db()

class UsersDislikes(db.Model):
    user_name = db.Column(db.TEXT, primary_key=True, nullable=False)
    selected_name = db.Column(db.TEXT, primary_key=True, nullable=False)
    candidate = db.Column(db.TEXT, primary_key=True, nullable=False)

    def __repr__(self):
        return "<UsersDislikes(user_name='%s' selected_name='%s, candidate='%s')>" % (
            self.user_name, self.selected_name, self.candidate)