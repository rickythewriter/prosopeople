"""update user model

Revision ID: aada66a51e2f
Revises: ffdc0a98111c
Create Date: 2022-01-23 22:47:48.525199

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'aada66a51e2f'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():

    op.add_column('users', sa.Column('first_name', sa.String(length=100), nullable=False))
    op.add_column('users', sa.Column('last_name', sa.String(length=100), nullable=True))


def downgrade():
    pass
