from flask import *
from flask_sqlalchemy import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
import json

# importing all required modules 
settings = json.load(open('settings.json', 'r'))
general_settings = settings['general-settings']
title = general_settings['title']
# importing some required variables z
app = Flask(__name__)

# initialising important variable 

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
  app.run(host='127.0.0.1', port=5000, debug=True)
 