from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Entry
from app.forms import EntryForm
from sqlalchemy.sql import func

entry_routes = Blueprint('entries', __name__)

@entry_routes.route('/<int:id>')
@login_required
def entry(id):
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

@entry_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_entry(id):
	entry = Entry.query.get(id)
	db.session.delete(entry)
	db.session.commit()
	return entry.to_dict()