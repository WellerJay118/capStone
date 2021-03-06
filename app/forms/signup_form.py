from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
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
        'username', validators=[DataRequired('Please enter a Username'), username_exists, Length(min=1, max=40)])
    email = StringField('email', validators=[DataRequired('Please enter an email address'), user_exists, Email(message="Please enter a valid Email address"), Length(min=1, max=255)])
    # for email validation, have to pip install wtforms[email] and import it
    password = StringField('password', validators=[DataRequired('Please enter a password')])
    firstName = StringField('firstName', validators=[DataRequired('Please enter a First Name'),Length(min=1, max=55)])
    lastName = StringField('lastName', validators=[DataRequired('Please enter a Last Name'), Length(min=1, max=55)])
