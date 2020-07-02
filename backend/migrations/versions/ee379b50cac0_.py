"""empty message

Revision ID: ee379b50cac0
Revises: b206e791b70a
Create Date: 2020-07-02 16:17:17.681631

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ee379b50cac0'
down_revision = 'b206e791b70a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('games', sa.Column('round', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('games', 'round')
    # ### end Alembic commands ###
