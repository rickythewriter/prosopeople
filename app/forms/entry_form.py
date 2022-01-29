from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import Entry

"""
Form Classes
"""

class EntryForm(FlaskForm):	
	"""
		Create a new entry
			accept a title, body, and current time.
		Update a person
			accepting non-required fields
	"""
	title = StringField('name', validators=[Length(min=0,max=100,message="Title must be 100 characters or shorter.")])
	body = TextAreaField('body', validators=None)
	person_id = IntegerField('person_id', validators=[DataRequired()])
	user_id = IntegerField('user_id', validators=[DataRequired()])
	created_at = DateTimeField('created_at')
	updated_at = DateTimeField('updated_at')