from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Entry(db.Model):
    __tablename__ = 'entries'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(100))
    body = db.Column(db.Text)

    # user
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    user = db.relationship("User", back_populates="entries")

    # dossier
    person_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("people.id"), ondelete="CASCADE"), nullable=False)
    person = db.relationship("Person", back_populates="entries")

    # images
    images = db.relationship("Image", back_populates="entry", passive_deletes=True)

    # recordkeeping
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'updated_at': self.updated_at,
        }