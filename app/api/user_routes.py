from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Person, Entry, Tag, PersonTag
from app.forms import PersonForm, EntryForm, TagForm, PersonTagForm
from app.api.auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)

'''
Auth Routes
'''

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

'''
Dossier Routes
'''

@user_routes.route('/<int:id>/people')
@login_required
# Returns an object with 
#     the key, "people", and
#     the value, an array of person objects
def get_people(id):
    user = User.query.get(id)
    people = Person.query.filter(Person.user_id == user.id).all()
    obj = {"people":[person.to_dict() for person in people]}
    return obj;

'''
Entry Routes
'''

# Create entry
@user_routes.route('/<int:id>/people/<person_id>/entries', methods=['POST'])
@login_required
def create_entry(id, person_id):
    user = User.query.get(id)
    person = Person.query.get(person_id)
    form = EntryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        entry = Entry()
        form.populate_obj(entry)
        db.session.add(entry)
        db.session.commit()
        return entry.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

'''
Tag Routes
'''

# Get all of a user's tags
@user_routes.route('/<int:id>/tags')
@login_required
def get_user_tags(id):
    user = User.query.get(id)
    user_tags = Tag.query.filter(Tag.user_id == user.id).all()
    obj = {"tags":[user_tag.to_dict() for user_tag in user_tags]}
    return obj

# Create a tag
@user_routes.route('/<int:id>/tags', methods=['POST'])
@login_required
def create_tag(id):
    user = User.query.get(id)
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        tag = Tag()
        form.populate_obj(tag)
        db.session.add(tag)
        db.session.commit()
        return tag.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Associate a tag with a person
@user_routes.route('/<int:id>/people/<person_id>/tags/<tag_id>', methods=['POST'])
@login_required
def associate_tag(id, person_id, tag_id):
    user = User.query.get(id)
    person = Person.query.get(person_id)
    tag = Tag.query.get(tag_id)
    form = PersonTagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        person_tag = PersonTag()
        form.populate_obj(person_tag)
        db.session.add(person_tag)
        db.session.commit()
        return tag.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401