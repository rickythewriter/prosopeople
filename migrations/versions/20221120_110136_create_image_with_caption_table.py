"""create image with caption table

Revision ID: 54a6f44b97b3
Revises: d05a7e5e53b4
Create Date: 2022-11-20 11:01:36.721685

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '54a6f44b97b3'
down_revision = 'd05a7e5e53b4'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('images',
    
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    
    sa.Column('filename', sa.String(length=512), nullable=False),
    sa.UniqueConstraint('filename'),

    sa.Column('caption', sa.Text),
    
    sa.Column('entry_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['entry_id'], ['entries.id'], ondelete="CASCADE"),

    sa.Column('person_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['person_id'], ['people.id'], ondelete="CASCADE"),
    
    sa.Column('user_id', sa.Integer(), nullable=False), 
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),

    sa.Column('created_at', sa.DateTime(), server_default=sa.sql.func.now()),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.sql.func.now()),
    )


def downgrade():
    op.drop_table('images')