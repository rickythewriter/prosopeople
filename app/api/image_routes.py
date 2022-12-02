from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import db, ImageWithCaption
from app.forms import ImageWithCaptionForm
from app.s3_resources import upload_image_to_s3_bucket
from datetime import datetime
from sqlalchemy.sql import func
from app.api.auth_routes import validation_errors_to_error_messages

image_routes = Blueprint('images', __name__)

@image_routes.route('/upload', methods=['POST'])
@login_required
def upload_image():
    image = request.files['image']
    image.filename = _create_unique_filename(image.filename)
    upload_image_to_s3_bucket(image)
    return {'filename': image.filename}

@image_routes.route('/', methods=['POST'])
@login_required
# Create an image-with-caption object, and upload it to AWS
def create_image_with_caption():

    form = ImageWithCaptionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

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

@image_routes.route('/<int_id>', methods=['PUT'])
@login_required
def update_image_caption(id):
    image_with_caption = ImageWithCaption.query.get(id)
    form = ImageWithCaptionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image_with_caption = ImageWithCaption()
        image_with_caption.caption = form.caption.data
        image_with_caption.updated_at = func.now()
        db.session.commit()
        return image_with_caption.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@image_routes.route('/<int_id>', methods=['DELETE'])
@login_required
# Delete an image-with-caption object from database and from AWS
def delete_image_with_caption(id):

    image_with_caption = ImageWithCaption.query.get(id)

    s3_bucket = get_bucket()
    delete_file_from_s3_bucket(image_with_caption.filename, s3_bucket)

    db.session.delete(image_with_caption)
    db.session.commit()
    
    return image_with_caption.to_dict();