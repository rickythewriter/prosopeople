from .db import db
from sqlalchemy.sql import func

class Person(db.Model):
    __tablename__ = 'people'

    id = db.Column(db.Integer, primary_key=True)

    # relationship information
    name = db.Column(db.String(100), nullable=False)
    relationship = db.Column(db.String(60))

    # descriptive information
    description = db.Column(db.Text)
    websites = db.Column(db.ARRAY(db.String(255)))
    social_media = db.Column(db.ARRAY(db.String(255)))
    birthday = db.Column(db.Date)

    # contact information
    email_addresses = db.Column(db.ARRAY(db.String(254)))
    phone_numbers = db.Column(db.ARRAY(db.String(40)))
    addresses = db.Column(db.ARRAY(db.Text))
    company = db.Column(db.String(150))

    # user
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="people")

    # database timekeeping
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'relationship': self.relationship,
            'description': self.description,
            'websites': self.websites,
            'social_media': self.social_media,
            'birthday': self.birthday,
            'email_addresses': self.email_addresses,
            'phone_numbers': self.phone_numbers,
            'addresses': self.addresses,
            'company': self.company,
        }