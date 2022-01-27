from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField
from wtforms.validators import DataRequired, Email, Length, URL, ValidationError
from app.models import Person

"""
Validator Functions
"""

def name_is_not_too_long(form, field):
	"""
		This is the name with which the user refers to their contact; not necessarily a full name
	"""
	name = field.data
	if len(name) > 100:
		raise ValidationError('Name must be 100 characters or shorter.')

"""
Form Classes
"""

class PersonForm(FlaskForm):	
"""
	Create a new person
		accepting only a name field
	Update a person
		accepting non-required fields
"""
	name = StringField('name', validators=[DataRequired(), name_is_not_too_long])
	description = TextAreaField('description', validators=None)