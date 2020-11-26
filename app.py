from flask import *
from flask_sqlalchemy import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import update
import json
from hashlib import md5
from date import datenow
from date import check_age
from flask_mail import Mail
from flask_mail import Message
from random import randint

# importing all required modules
settings = json.load(open('settings.json', 'r'))
general_settings = settings['general-settings']
title = general_settings['title']
secret_key = general_settings['skey']
db = general_settings['db']
email_settings = settings['email']
email_id = email_settings['sender']
password = email_settings['password']
port = email_settings['port']
server = email_settings['server']
# importing some required variables z
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = db
app.config['SECRET_KEY'] = secret_key
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_PORT'] = port
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = email_id
app.config['MAIL_PASSWORD'] = password
app.config['MAIL_SERVER'] = server
db = SQLAlchemy(app)
mail = Mail(app)


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
    v = db.Column(db.Integer, default=0)
    p = db.Column(db.String, default='profile/notAvailable.png')

class Verification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer)
    otp = db.Column(db.Integer)

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
        verification = Users.query.filter_by(email=session['user']).first()
        return render_template('index.html', js='JavaScript/index.js', css='style/index.css', title=title, v=verification.v, p=verification.p)
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
    try:
      random_number = randint(100000, 999999)
      verification = Verification(user=email, otp=random_number)
      db.session.add(verification)
      db.session.commit()
      msg = Message('Thanks for Signing Up', sender = email_id, recipients = [email])
      msg.html = f'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Welcome to THEBOI</title></head><body style=" font-family:sans-serif;"><h1 style="color: #2D88FF;">Hello {name},</h1><p>Thanks for Signing Up for THEBOI.</p><p>Your verification code is: </p><h2 style="color: #2D88FF;">{random_number}</h2><p>Make sure you read all our <a href="/terms" style="color: #2D88FF;">Terms and Condition</a></p></body></html>'
      mail.send(msg)
    except:
      pass
    return 'op'
  else:
    return redirect('/')

@app.route('/verify', methods=['GET', 'POST'])
def verify():
  verification = Users.query.filter_by(email=session['user']).first()
  if verification.v == 0:
    return render_template('verify.html', p=verification.p, title=title, css='style/login.css', js='JavaScript/verify.js')
  else:
    redirect('/')

@app.route('/veri', methods=['GET', 'POST'])
def veri():
  if request.method == 'POST':
    vcode = request.form.get('v')
    v = Verification.query.filter_by(user=session['user'], otp=vcode).first()
    if v == None:
      return 'n'
    else:
      user = Users.query.filter_by(email=session['user']).first()
      user.v = 1
      db.session.flush()
      db.session.commit()
      verification_entry = Verification.query.filter_by(user=session['user'], otp=vcode).delete()
      db.session.commit()
      return 'o'
  else:
    return redirect('/')

@app.route('/post', methods=['GET', 'POST'])
def post():
  if request.method == 'POST':
    return "hi"
  else:
    return redirect('/')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
