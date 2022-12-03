from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import db, Image
from app.forms import ImageForm
from app.s3_resources import upload_image_to_s3_bucket, delete_file_from_s3_bucket
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

def _create_unique_filename(name):
    timestamp = str(datetime.utcnow().timestamp()).replace('.','')
    return timestamp + '-' + name

# Create an image object, and upload it to AWS
@image_routes.route('/', methods=['POST'])
@login_required
def create_image():
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = Image()
        form.populate_obj(image)
        db.session.add(image)
        db.session.commit()
        return image.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
# Delete an image object from database and from AWS
def delete_image(id):

    image = Image.query.get(id)

    delete_file_from_s3_bucket(image.filename)

    db.session.delete(image)
    db.session.commit()
    
    return image.to_dict();