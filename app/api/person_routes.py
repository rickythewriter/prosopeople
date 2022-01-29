from flask import Blueprint, request, session
from flask_login import login_required
from app.models import db, Person, Entry
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
	# Delete task from database
	# return success message

# Get entries
@person_routes.route('/<int:id>/entries')
@login_required
def get_entries(id):
    person = Person.query.get(id)
    entries = Entry.query.filter(Entry.person_id == person.id).all()
    obj = {"entries":[entry.to_dict() for entry in entries]}
    return obj;