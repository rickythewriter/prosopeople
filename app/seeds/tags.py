from app.models import db, Tag, PersonTag

# Adds demo tags
def seed_tags():
	artist = Tag(
		name = "artist",
		user_id = 1
		)
	celebrity = Tag(
		name = "celebrity",
		user_id = 1
		)
	classmate = Tag(
		name = "classmate",
		user_id = 1
		)
	coworker = Tag(
		name = "coworker",
		user_id = 1
		)
	musician = Tag(
		name = "musician",
		user_id = 1
		)
	swe = Tag(
		name = "software engineer",
		user_id = 1
		)

	db.session.add(artist)
	db.session.add(celebrity)
	db.session.add(classmate)
	db.session.add(coworker)
	db.session.add(musician)
	db.session.add(swe)

	ay_tag_1 = PersonTag(
    	person_id = 1, 
    	tag_id = 6,
    	user_id = 1
    	)
	ay_tag_2 = PersonTag(
    	person_id = 1, 
    	tag_id = 3,
    	user_id = 1
    	)

	bf_tag_1 = PersonTag(
    	person_id = 2, 
    	tag_id = 6,
    	user_id = 1
    	)
	bf_tag_2 = PersonTag(
    	person_id = 2, 
    	tag_id = 3,
    	user_id = 1
    	)
	bf_tag_3 = PersonTag(
    	person_id = 2, 
    	tag_id = 5,
    	user_id = 1
    	)

	ca_tag = PersonTag(
    	person_id = 3,
    	tag_id = 4,
    	user_id = 1
    	)

	br_tag_1 = PersonTag(
    	person_id = 4, 
    	tag_id = 1,
    	user_id = 1
    	)
	br_tag_2 = PersonTag(
    	person_id = 4, 
    	tag_id = 2,
    	user_id = 1
    	)

	ra_tag_1 = PersonTag(
    	person_id = 5, 
    	tag_id = 5,
    	user_id = 1
    	)
	ra_tag_2 = PersonTag(
    	person_id = 5, 
    	tag_id = 2,
    	user_id = 1
    	)
  
	db.session.add(ay_tag_1)
	db.session.add(ay_tag_2)
	db.session.add(bf_tag_1)
	db.session.add(bf_tag_2)
	db.session.add(bf_tag_3)
	db.session.add(ca_tag)
	db.session.add(br_tag_1)
	db.session.add(br_tag_2)
	db.session.add(ra_tag_1)
	db.session.add(ra_tag_2)

	db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tags():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()