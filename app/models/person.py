from .db import db
from sqlalchemy.sql import func

class Person(db.Model):
    __tablename__ = 'people'

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)

    # user
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="people")

    # entries
    entries = db.relationship("Entry", back_populates="person")

    # tags
    tags = db.relationship("PersonTag", back_populates="person")

    # database timekeeping
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
        }