from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Person(db.Model):
    __tablename__ = 'people'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)

    # user
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    user = db.relationship("User", back_populates="people")

    # entries
    entries = db.relationship("Entry", back_populates="person", passive_deletes=True)

    # tags
    tags = db.relationship("PersonTag", back_populates="person", passive_deletes=True)

    # images
    images = db.relationship("Image", back_populates="person", passive_deletes=True)

    # database timekeeping
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
        }