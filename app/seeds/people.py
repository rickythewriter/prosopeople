from app.models import db, Person

# Adds demo people to a demo user, you can add other users here if you want
def seed_people():
    ay = Person(
    	name = "Ashton Yeung",
    	relationship = "high school classmate",
    	description = "An accomplished developer in his own right, we work together to further our spiritual development, particularly in matters of physical fitness, language, and career.",
    	websites = ["https://medium.com/@ayeungoneintech"],
    	social_media = ["Facebook: @ashtonyeung", "Instagram: @ymiashton"],
    	birthday = "Jul 15 1991",
    	email_addresses = ["ashyeung@livingnotes.com"],
    	phone_numbers = ["6265555354", "6265553517"],
    	addresses = ["123 Fake St, Springfield, WA, USA"],
    	company = "WebFlicks",
    	user_id = 1
    	)

    bf = Person(
    	name = "Brenda Fong",
    	user_id = 1
		)
   	ca  = Person(
   		name = "Christian Anderson",
   		user_id = 1
		)

    db.session.add(ay)
    db.session.add(bf)
    db.session.add(ca)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_people():
    db.session.execute('TRUNCATE people RESTART IDENTITY CASCADE;')
    db.session.commit()
