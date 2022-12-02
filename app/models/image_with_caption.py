from .db import db
from sqlalchemy.sql import func
from app.s3_resources import get_signed_url

class ImageWithCaption(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)

    filename = db.Column(db.String(512), unique=True)
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
            'signed_url': get_signed_url(self.filename),
            'filename': self.filename,
            'caption': self.caption,
            'created_at': self.created_at,
        }