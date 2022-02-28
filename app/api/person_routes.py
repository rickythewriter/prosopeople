from flask import Blueprint, request, session
from flask_login import login_required
from app.models import db, Person, Entry, Tag, PersonTag
from app.forms import PersonForm

person_routes = Blueprint('people', __name__)

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
	db.session.delete(person)
	db.session.commit()
	return person.to_dict();

# Get entries
@person_routes.route('/<int:id>/entries')
@login_required
def get_entries(id):
    person = Person.query.get(id)
    entries = Entry.query.filter(Entry.person_id == person.id).all()
    obj = {"entries":[entry.to_dict() for entry in entries]}
    return obj;

# Delete all of a person's entries
@person_routes.route('/<int:id>/entries', methods=['DELETE'])
@login_required
def delete_entries(id):
	person = Person.query.get(id)
	entries = Entry.query.filter(Entry.person_id == person.id).delete()
	# print("These are the entries: ", entries)
	# db.session.delete(entries)
	db.session.commit()
	return {"message" : "entries deleted"}

# Get all of a person's tags
@person_routes.route('/<int:id>/tags')
@login_required
def get_person_tags(id):
	person = Person.query.get(id)
	people_tags = PersonTag.query.filter(PersonTag.person_id == person.id).all()
	obj = {"tags":[person_tag.tag.to_dict() for person_tag in people_tags]}
	return obj

# Dissociate a tag from a person
@person_routes.route('/<int:id>/tags/<tag_id>', methods=['DELETE'])
@login_required
def dissociate_tag_from_person(id, tag_id):
	tag = Tag.query.get(tag_id)
	person_tag = PersonTag.query.filter(PersonTag.person_id == id, PersonTag.tag_id == tag.id).first()
	print('persontag is: ', person_tag)
	db.session.delete(person_tag)
	db.session.commit()
	return tag.to_dict()

