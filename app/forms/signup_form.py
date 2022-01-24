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

def name_is_not_too_long(form, field):
    # Checking if first name has fewer than fifty characters
    name = field.data
    if len(name) > 50:
        raise ValidationError('First Name must be 50 characters or less.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[name_is_not_too_long, DataRequired()])
    last_name = StringField('last_name', validators=[name_is_not_too_long])
