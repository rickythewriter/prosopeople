from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Tag(db.Model):
	__tablename__ = 'tags'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(50), nullable=False)

	# user
	user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
	user = db.relationship("User", back_populates="tags")

    # people
	people = db.relationship("PersonTag", back_populates="tag", passive_deletes=True)

	def to_dict(self):
		return {
			'id': self.id,
			'name': self.name,
		}