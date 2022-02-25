from .db import db
from sqlalchemy.sql import func

class PersonTag(db.Model):
	__tablename__ = 'people_tags'

	# dossier(s)
	person_id = db.Column(db.ForeignKey('people.id'), primary_key=True)
	person = db.relationship("Person", back_populates="tags")

	# tag(s)
	tag_id = db.Column(db.ForeignKey('tags.id', ondelete="CASCADE"), primary_key=True)
	tag = db.relationship("Tag", back_populates="people")
	

	# user
	user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
	user = db.relationship("User", back_populates="people_tags")