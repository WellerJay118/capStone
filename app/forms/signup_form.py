from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired('Please enter a Username'), username_exists])
    email = StringField('email', validators=[DataRequired('Please enter an email address'), user_exists])
    password = StringField('password', validators=[DataRequired('Please enter a password')])
    firstName = StringField('firstName', validators=[DataRequired('Please enter a First Name')])
    lastName = StringField('lastName', validators=[DataRequired('Please enter a Last Name')])
