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

def username_within_char_range(form,field):
    # Checking if username is between six to forty characters
    username = field.data
    if len(username) > 40:
        raise ValidationError('Username must be 40 characters or fewer.')
    if len(username) < 6:
        raise ValidationError('Username must contain at least six characters.')

def password_within_char_range(form,field):
    # Checking if password is between six to forty characters
    password = field.data
    if len(password) > 100:
        raise ValidationError('Password must be 100 characters or fewer.')
    if len(password) < 8:
        raise ValidationError('Password must contain at least eight characters.')

def name_is_not_too_long(form, field):
    # Checking if first name has fewer than fifty characters
    name = field.data
    if len(name) > 50:
        raise ValidationError('First Name must be 50 characters or fewer.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_within_char_range])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_within_char_range])
    first_name = StringField('first_name', validators=[name_is_not_too_long, DataRequired()])
    last_name = StringField('last_name', validators=[name_is_not_too_long])
