from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import db, Tag

tag_routes = Blueprint('tags', __name__)

# Delete a tag
@tag_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_tag(id):
	tag = Tag.query.get(id)
	db.session.delete(tag)
	db.session.commit()
	return tag.to_dict();