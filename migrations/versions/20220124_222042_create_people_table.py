"""create people table

Revision ID: 76a083802815
Revises: ffdc0a98111c
Create Date: 2022-01-24 22:20:42.840794

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '76a083802815'
down_revision = 'aada66a51e2f'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('people',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('relationship', sa.String(60)),
    sa.Column('description', sa.Text),
    sa.Column('websites', sa.ARRAY(sa.String(255))),
    sa.Column('social_media', sa.ARRAY(sa.String(255))),
    sa.Column('birthday', sa.Date),
    sa.Column('email_addresses', sa.ARRAY(sa.String(254))),
    sa.Column('phone_numbers', sa.ARRAY(sa.String(40))),
    sa.Column('addresses', sa.ARRAY(sa.Text)),
    sa.Column('company', sa.String(150)),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    sa.Column('created_at', sa.DateTime(), server_default=sa.sql.func.now()),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.sql.func.now())
    )


def downgrade():
    op.drop_table('people')
