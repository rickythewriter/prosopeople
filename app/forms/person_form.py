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

def relationship_input_is_not_too_long(form,field):
	relationship = field.data
	if len(relationship) > 60:
		raise ValidationError('Relationship input is too long. Please use 60 characters or fewer.')

def input_is_not_longer_than_255(form, field):
	form_input = field.data
	if len(form_input) > 255:
		raise ValidationError('Input is too long. Please use 255 characters or fewer.')

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
	relationship = StringField('relationship', validators=[relationship_input_is_not_too_long])
	description = TextAreaField('description', validators=None)
	website = StringField('website',validators=[URL(), input_is_not_longer_than_255])
	social_medium = StringField('social medium',validators=[input_is_not_longer_than_255])
	birthday = DateField('birthday', validators=None)
	email_address = StringField('email address', validators=[Email()])
	phone_number = StringField('phone number', validators=None)
	address = TextAreaField('address', validators=None)
	company = StringField('company', validators=[Length(max=150,message="Input is too long. Please use 150 characters or fewer.")])


