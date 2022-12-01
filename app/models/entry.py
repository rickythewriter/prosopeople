from .db import db
from sqlalchemy.sql import func

class Entry(db.Model):
    __tablename__ = 'entries'

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(100))
    body = db.Column(db.Text)

    # images
    images = db.relationship("ImageWithCaption", back_populates="entries", passive_deletes=True)

    # dossier
    person_id = db.Column(db.Integer, db.ForeignKey("people.id", ondelete="CASCADE"), nullable=False)
    person = db.relationship("Person", back_populates="entries")

    # user
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="entries")

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