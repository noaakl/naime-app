import sys

sys.path.insert(0, '/var/www/naime/backend/')

activate_this = "/var/www/naime/backend/env/bin/activate_this.py"
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

from base import api

application = api