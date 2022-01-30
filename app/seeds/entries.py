from app.models import db, Entry

# Adds demo entries to a demo user, you can add other users here if you want
def seed_entries():
    entry1 = Entry(
    	title = "How We Met",
    	body = "We were high school classmates who met during college. After reconnecting on Facebook, he invited me to go ride bikes at Google.\nHe helped me pick a gift for my girlfriend's parents.\nAlthough we gossiped about a mutual friend, he expressed an interest in changing this habit. He quoted, \"Great minds discuss ideas. Average minds discuss events. Small minds discuss people.\" \"My mind will grow and shrink as it pleases,\" I retorted.",
    	user_id = 1,
        person_id = 1
    	)
    entry2 = Entry( title = "What I remember about the night we went drinking",
        body = "", 
        user_id = 1,
        person_id = 2)
    entry3 = Entry( title = "", 
        body = "His enthusiasm for sleeping and for burritos was memorable.",
        user_id = 1,
        person_id = 3)

    db.session.add(entry1)
    db.session.add(entry2)
    db.session.add(entry3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_entries():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
