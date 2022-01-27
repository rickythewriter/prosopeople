from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Person
from app.forms import PersonForm

user_routes = Blueprint('users', __name__)


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

@user_routes.route('/<int:id>/people', methods=['POST'])
@login_required
def create_person(id):
    user = User.query.get(id)
    form = PersonForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        person = Person()
        form.populate_obj(person)
        db.session.add(person)
        db.session.commit()
        return person.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
