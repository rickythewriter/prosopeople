from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Length
from app.models import Image

"""
Form Classes
"""

class ImageForm(FlaskForm):	
	"""
		Create a new image
			accept an image link, caption, and current time.
		Update an image
			accepting non-required fields
	"""
	link = StringField('name', validators=[DataRequired(), Length(min=2,max=1024,message="Link must not exceed 1024 characters")])
	caption = TextAreaField('body', validators=None)
    entry_id = IntegerField('entry_id', validators=[DataRequired()])
	person_id = IntegerField('person_id', validators=[DataRequired()])
	user_id = IntegerField('user_id', validators=[DataRequired()])
	created_at = DateTimeField('created_at')
	updated_at = DateTimeField('updated_at')