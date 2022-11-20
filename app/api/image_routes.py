from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import db, ImageWithCaption
from app.forms import ImageWithCaptionForm
from s3_resources import get_bucket, upload_image_to_s3_bucket
from datetime import datetime

image_routes = Blueprint('images', __name__)

@image_routes.route('/', methods=['POST'])
@login_required
# Create an image-with-caption object, and upload it to AWS
def create_image_with_caption():

    s3_bucket = get_bucket()
    image = request.files['entry_image']
    image.filename = _create_unique_filename(image.filename)
    upload_image_to_s3_bucket(image, s3_bucket)

    form = ImageWithCaptionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['filename'].data = image.filename

    if form.validate_on_submit():
        image_with_caption = ImageWithCaption()
        form.populate_obj(image_with_caption)
        db.session.add(image_with_caption)
        db.session.commit()
        return image_with_caption.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

def _create_unique_filename(name):
    timestamp = str(datetime.utcnow().timestamp()).replace('.','')
    return timestamp + '-' + name