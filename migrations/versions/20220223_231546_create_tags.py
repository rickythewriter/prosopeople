"""create_tags

Revision ID: d05a7e5e53b4
Revises: 65849c39c8e0
Create Date: 2022-02-23 23:15:46.173316

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'd05a7e5e53b4'
down_revision = '65849c39c8e0'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    )

    if environment == "production":
        op.execute(f"ALTER TABLE tags SET SCHEMA {SCHEMA};")

    op.create_table('people_tags',
    sa.Column('person_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['person_id'], ['people.id'], ondelete="CASCADE"),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], ondelete="CASCADE"),
    sa.PrimaryKeyConstraint('person_id','tag_id'),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    )

    if environment == "production":
        op.execute(f"ALTER TABLE people_tags SET SCHEMA {SCHEMA};")
    

def downgrade():
    op.drop_table('people_tags')
    op.drop_table('tags')
    
