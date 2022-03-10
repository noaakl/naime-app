from datetime import datetime
from flask_application import FlaskApplication

app = FlaskApplication()
api = app.get_app()
db = app.get_db()

class UsersDislikes(db.Model):
    user_name = db.Column(db.TEXT, primary_key=True, nullable=False)
    selected_name = db.Column(db.TEXT, primary_key=True, nullable=False)
    candidate = db.Column(db.TEXT, primary_key=True, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow())

    def __repr__(self):
        return "<UsersDislikes(user_name='%s' selected_name='%s, candidate='%s', date='%s')>" % (
            self.user_name, self.selected_name, self.candidate, self.date)