from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import PersonTag

"""
Form Classes
"""

class PersonTagForm(FlaskForm):	
	"""
		Create a new person tag
	"""
	person_id = IntegerField('person_id', validators=[DataRequired()])
	tag_id = IntegerField('tag_id', validators=[DataRequired()])
	user_id = IntegerField('user_id', validators=[DataRequired()])