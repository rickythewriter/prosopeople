from flask import Blueprint, request, session
from flask_login import login_required
from app.models import db, Person, Entry, Tag, PersonTag, Image
from app.forms import PersonForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3_resources import delete_file_from_s3_bucket

person_routes = Blueprint('people', __name__)

@person_routes.route('/', methods=['POST'])
@login_required
def create_person():
	form = PersonForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	if form.validate_on_submit():
		person = Person()
		form.populate_obj(person)
		db.session.add(person)
		db.session.commit()
		return person.to_dict()
	return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@person_routes.route('/<int:id>')
@login_required
def person(id):
	person=Person.query.get(id)
	return person.to_dict()

@person_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_person(id):
	person = Person.query.get(id)
	form = PersonForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	if form.validate_on_submit:
		person.name = form.name.data
		person.description = form.description.data
		db.session.commit()
		return person.to_dict()
	return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@person_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_person(id):
	person = Person.query.get(id)
	person_images = Image.query.filter(Image.person_id == person.id).all()
	[delete_file_from_s3_bucket(image.filename) for image in person_images]
	db.session.delete(person)
	db.session.commit()
	return person.to_dict();

@person_routes.route('/<int:id>/entries')
@login_required
def get_entries(id):
    person = Person.query.get(id)
    entries = Entry.query.filter(Entry.person_id == person.id).all()
    return {"entries":[entry.to_dict() for entry in entries]}

@person_routes.route('/<int:id>/entries', methods=['DELETE'])
@login_required
def delete_entries(id):
	person = Person.query.get(id)
	Entry.query.filter(Entry.person_id == person.id).delete()
	db.session.commit()
	return {"message" : "entries deleted"}

@person_routes.route('/<int:id>/tags')
@login_required
def get_person_tags(id):
	person = Person.query.get(id)
	people_tags = PersonTag.query.filter(PersonTag.person_id == person.id).all()
	return {"tags":[person_tag.tag.to_dict() for person_tag in people_tags]}

@person_routes.route('/<int:id>/tags/<tag_id>', methods=['DELETE'])
@login_required
def dissociate_tag_from_person(id, tag_id):
	tag = Tag.query.get(tag_id)
	person_tag = PersonTag.query.filter(PersonTag.person_id == id, PersonTag.tag_id == tag.id).first()
	db.session.delete(person_tag)
	db.session.commit()
	return tag.to_dict()

@person_routes.route('/<int:id>/images')
@login_required
def get_person_images(id):
	person = Person.query.get(id)
	dossier_images = Image.query.filter(Image.person_id == person.id).all()
	return {'images':[image.to_dict() for image in dossier_images]}