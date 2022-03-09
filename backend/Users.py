
from flask_application import FlaskApplication

app = FlaskApplication()
api = app.get_app()
db = app.get_db()

class Users(db.Model):
    user_name = db.Column(db.TEXT, primary_key=True)
    first_name = db.Column(db.TEXT, nullable=False)
    last_name = db.Column(db.TEXT, nullable=False)
    email = db.Column(db.TEXT, nullable=False)
    password = db.Column(db.TEXT, nullable=False)

    def __repr__(self):
        return "<Users(user_name='%s' first_name='%s, last_name='%s', email='%s', password='%s')>" % (
            self.user_name, self.first_name, self.last_name, self.email, self.password)