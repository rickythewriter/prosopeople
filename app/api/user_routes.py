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
def get_people(id):
    user = User.query.get(id)
    people = Person.query.filter(Person.user_id == user.id).all()
    return {"people":[person.to_dict() for person in people]};

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