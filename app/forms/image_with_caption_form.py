from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Length
from app.models import ImageWithCaption

"""
Form Classes
"""

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "gif"}

def is_valid_filename(form, field):
	filename = field.data
	if len(filename.rsplit('.')) != 2:
		raise ValidationError('File must only have one extension')

def is_image(form, field):
	filename = field.data
	filename_extension = filename.rsplit('.')[-1].lower()
	if filename_extension not in ALLOWED_EXTENSIONS:
		raise ValidationError('File must be of extension type: jpg, jpeg, png, or gif')

class ImageWithCaptionForm(FlaskForm):	
	"""
		Create a new image-with-caption object.
		Update an image-with-caption's caption.
	"""
	filename = StringField('filename', validators=[DataRequired(), Length(min=2,max=512,message="File name must not exceed 512 characters"), is_valid_filename, is_image])
	caption = TextAreaField('caption', validators=None)
	entry_id = IntegerField('entry_id', validators=[DataRequired()])
	person_id = IntegerField('person_id', validators=[DataRequired()])
	user_id = IntegerField('user_id', validators=[DataRequired()])
	created_at = DateTimeField('created_at')
	updated_at = DateTimeField('updated_at')