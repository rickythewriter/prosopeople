from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import db, Tag, PersonTag

tag_routes = Blueprint('tags', __name__)

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
	obj = {"people":[tagged_person.person.to_dict() for tagged_person in tagged_people]}
	return obj