from flask.cli import AppGroup
from .users import seed_users, undo_users
from .people import seed_people, undo_people
from .entries import seed_entries, undo_entries
from .tags import seed_tags, undo_tags

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_people()
    seed_entries()
    seed_tags()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # undo_people()
    # undo_entries()
    # Add other undo functions here
