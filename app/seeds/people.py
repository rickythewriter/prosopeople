from app.models import db, Person

# Adds demo people
def seed_people():
    ay = Person(
    	name = "Ashton Yeung",
    	description = "An accomplished developer in his own right, we work together to further our spiritual development, particularly in matters of physical fitness, language, and career.",
    	user_id = 1
    	)
    bf = Person( name = "Brenda Fong", description="Loves Korean barbecue. In fact, would only go out if I suggest it. Holds a formidable drink.", user_id = 1)
    ca = Person( 
        name = "Christian Anderson", user_id = 1)
    br = Person(
        name = "Bob Ross",
        description = "Nice afro\n\nTalented painter.\n\nHappy little artist.\n\nPthalo blue.\n\nhere is more uipdates\n\n(credit: David Rogers)",
        user_id = 1
    )
    ra = Person(
        name = "~ Richard Paul Astley ~",
        description = "Talented. Good dancer.\n\nNever gonna give you up.\n\nAnd other stuff\n\n(credit: David Rogers)",
        user_id = 1
    )

    db.session.add(ay)
    db.session.add(bf)
    db.session.add(ca)
    db.session.add(br)
    db.session.add(ra)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_people():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
