
from datetime import datetime
from flask_application import FlaskApplication

flask_app = FlaskApplication()
app = flask_app.get_app()
db = flask_app.get_db()

class UserSearch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    selected_name = db.Column(db.TEXT, nullable=False)
    type_name = db.Column(db.TEXT, nullable=False)
    language = db.Column(db.TEXT, nullable=False)
    search_date = db.Column(db.DateTime, default=datetime.utcnow())
    user_name = db.Column(db.TEXT)

    def __repr__(self):
        return '<UserSearch %r>' % self.id