from .db import db
from sqlalchemy.sql import func

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)

    link = db.Column(db.String(1024))
    caption = db.Column(db.Text)

    #entry
    entry_id = db.Column(db.Integer, db.ForeignKey("entries.id", ondelete="CASCADE"), nullable=False)
    entry = db.relationship("Entry", back_populates="images")

    #dossier
    person_id = db.Column(db.Integer, db.ForeignKey("people.id", ondelete="CASCADE"), nullable=False)
    person = db.relationship("Person", back_populates="images")

    #user
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="images")

    # recordkeeping
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'link': self.link,
            'caption': self.caption,
            'created_at': self.created_at,
        }