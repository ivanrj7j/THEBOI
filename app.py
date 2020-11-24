from flask import *
from flask_sqlalchemy import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
import json
from hashlib import md5
from date import datenow
from date import check_age

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


'''Declaring models'''


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    password = db.Column(db.String)
    name = db.Column(db.String)
    username = db.Column(db.String)
    gender = db.Column(db.String)
    birthday = db.Column(db.DateTime)
    date = db.Column(db.DateTime, default=datenow())


'''Models declaration end'''

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
    if check_log():
      return redirect('/')
    else:
      return render_template('login.html', title=title, js='JavaScript/login.js', css='style/login.css')

@app.route('/check_email', methods=['GET', 'POST'])
def cem():
   if request.method == 'POST':
     email = request.form.get('email')
     check = Users.query.filter_by(email=email).first()
     if check==None:
       return 'Ok'
     else:
       return 'Email already taken'
   else:
     return redirect('/')

@app.route('/check_un', methods=['GET', 'POST'])
def cun():
   if request.method == 'POST':
     un = request.form.get('un')
     check = Users.query.filter_by(username=un).first()
     if check==None:
       return 'Ok'
     else:
       return 'Username already taken'
   else:
     return redirect('/')

@app.route('/insert', methods=['GET', 'POST'])
def insert():
  if request.method == 'POST':
    email = request.form.get('email')
    name = request.form.get('name')
    ps = request.form.get('ps')
    un = request.form.get('un')
    gender = request.form.get('gender')
    dob = request.form.get('dob')
    user = Users(email=email, password=ps, name=name, username=un, gender=gender, birthday=dob)
    session['user'] = email
    session['name'] = name
    session['username'] = un
    db.session.add(user)
    db.session.commit()
    return 'op'
  else:
    return redirect('/')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
