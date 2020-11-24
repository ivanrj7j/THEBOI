from flask import *
from flask_sqlalchemy import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
import json

# importing all required modules 
settings = json.load(open('settings.json', 'r'))
general_settings = settings['general-settings']
title = general_settings['title']
secret_key = general_settings['skey']
db = general_settings['db']
# importing some required variables z
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = db
app.config['SECRET_KEY'] = secret_key
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# initialising important variable
def check_log():
  """
  Checks if user is logged in or not
  """
  if "user" in session and "name" in session:
    return True
  else:
    return False

@app.route('/')
def index():
  if check_log():
    return render_template('index.html', js='JavaScript/index.js', css='style/index.css', title=title)
  else:
    return redirect('signup')

@app.route('/signup', methods=['GET', 'POST'])
def login():
   '''
   Lets the user to login
   '''
   return render_template('login.html', title=title, js='JavaScript/login.js', css='style/login.css')

if __name__ == '__main__':
  app.run(host='127.0.0.1', port=5000, debug=True)
 