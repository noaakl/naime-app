from flask_application import FlaskApplication

flask_app = FlaskApplication()
app = flask_app.get_app()
db = flask_app.get_db()


class PhoneticAlgorithmsCodes(db.Model):
    name = db.Column(db.TEXT, primary_key=True)
    soundex = db.Column(db.TEXT, nullable=False)
    metaphone = db.Column(db.TEXT, nullable=False)
    double_metaphone_primary = db.Column(db.TEXT, nullable=False)
    double_metaphone_secondary = db.Column(db.TEXT, nullable=False)
    nysiis = db.Column(db.TEXT, nullable=False)
    match_rating_codex = db.Column(db.TEXT, nullable=False)

    def __repr__(self):
        return "<PhoneticAlgorithmsCodes(name='%s',soundex='%s',metaphone='%s', double_metaphone_primary='%s',double_metaphone_secondary='%s', nysiis='%s', matching_rating_codes='%s')>" % (
            self.name, self.soundex, self.metaphone, self.double_metaphone_primary, self.double_metaphone_secondary,
            self.nysiis, self.matching_rating_codes)
