
from flask_application import FlaskApplication

app = FlaskApplication()
api = app.get_app()
db = app.get_db()

class Users(db.Model):
    user_name = db.Column(db.TEXT, primary_key=True)
    password = db.Column(db.TEXT, nullable=False)

    def __repr__(self):
        return "<Users(user_name='%s',password='%s')>" % (
            self.user_name, self.password)