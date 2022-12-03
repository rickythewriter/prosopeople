"""create_entries_table

Revision ID: 65849c39c8e0
Revises: 76a083802815
Create Date: 2022-01-28 09:48:11.588887

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '65849c39c8e0'
down_revision = '76a083802815'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('entries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.Column('title', sa.String(length=100)),
    sa.Column('body', sa.Text),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    sa.Column('person_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['person_id'], ['people.id'], ondelete="CASCADE"),
    sa.Column('created_at', sa.DateTime(), server_default=sa.sql.func.now()),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.sql.func.now())
    )

    if environment == "production":
        op.execute(f"ALTER TABLE entries SET SCHEMA {SCHEMA};")

def downgrade():
    op.drop_table('entries')
