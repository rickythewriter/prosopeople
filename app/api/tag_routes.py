from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import db, Tag, PersonTag
from app.forms import TagForm
from app.api.auth_routes import validation_errors_to_error_messages

tag_routes = Blueprint('tags', __name__)

@tag_routes.route('/', methods=['POST'])
@login_required
def create_tag():
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        tag = Tag()
        form.populate_obj(tag)
        db.session.add(tag)
        db.session.commit()
        return tag.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@tag_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_tag(id):
	tag = Tag.query.get(id)
	db.session.delete(tag)
	db.session.commit()
	return tag.to_dict();

@tag_routes.route('/<int:id>/people')
@login_required
def get_tagged_people(id):
	tag = Tag.query.get(id)
	tagged_people = PersonTag.query.filter(PersonTag.tag_id == tag.id).all()
	return {"people":[tagged_person.person.to_dict() for tagged_person in tagged_people]}