from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Tag

"""
Form Classes
"""

class TagForm(FlaskForm):	
	"""
		Create a new tag
	"""
	name = StringField('name', validators=[DataRequired(), Length(min=1,max=50,message="Tag name must be 50 characters or shorter.")])
	user_id = IntegerField('user_id', validators=[DataRequired()])