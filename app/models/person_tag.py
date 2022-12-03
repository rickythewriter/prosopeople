from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class PersonTag(db.Model):
	__tablename__ = 'people_tags'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	# dossier(s)
	person_id = db.Column(db.ForeignKey(add_prefix_for_prod('people.id'), ondelete="CASCADE"), primary_key=True)
	person = db.relationship("Person", back_populates="tags")

	# tag(s)
	tag_id = db.Column(db.ForeignKey(add_prefix_for_prod('tags.id'), ondelete="CASCADE"), primary_key=True)
	tag = db.relationship("Tag", back_populates="people")
	

	# user
	user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
	user = db.relationship("User", back_populates="people_tags")