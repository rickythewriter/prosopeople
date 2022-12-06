from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Entry, Image
from app.forms import EntryForm
from sqlalchemy.sql import func
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3_resources import delete_file_from_s3_bucket

entry_routes = Blueprint('entries', __name__)

@entry_routes.route('/', methods=['POST'])
@login_required
def create_entry():
    form = EntryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        entry = Entry()
        form.populate_obj(entry)
        db.session.add(entry)
        db.session.commit()
        return entry.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@entry_routes.route('/<int:id>')
@login_required
def entry(id):
	"""
	Get an entry
	"""
	entry=Entry.query.get(id)
	return entry.to_dict()

@entry_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_entry(id):
	entry=Entry.query.get(id)
	form = EntryForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	if form.validate_on_submit:
		entry.title = form.title.data
		entry.body = form.body.data
		entry.updated_at = func.now()
		db.session.commit()
		return entry.to_dict()
	return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Delete associated images from S3 bucket, then delete entry
@entry_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_entry(id):
	entry = Entry.query.get(id)
	entry_images = Image.query.filter(Image.entry_id == entry.id).all()
	[delete_file_from_s3_bucket(image.filename) for image in entry_images]
	db.session.delete(entry)
	db.session.commit()
	return entry.to_dict()

# Get all of an entry's images
@entry_routes.route('/<int:id>/images')
@login_required
def get_entry_images(id):
	entry = Entry.query.get(id)
	entry_images = Image.query.filter(Image.entry_id == entry.id).all()
	return {'images': [image.to_dict() for image in entry_images]}