from app.models import db, Entry

# Adds demo entries to a demo user, you can add other users here if you want
def seed_entries():
    entry1 = Entry(
    	title = "How We Met",
    	body = "We were high school classmates who met during college. After reconnecting on Facebook, he invited me to go ride bikes at Google.\nHe helped me pick a gift for my girlfriend's parents.\nAlthough we gossiped about a mutual friend, he expressed an interest in changing this habit. He quoted, \"Great minds discuss ideas. Average minds discuss events. Small minds discuss people.\" \"My mind will grow and shrink as it pleases,\" I retorted.",
    	user_id = 1,
        person_id = 1
    	)
    entry2 = Entry( 
        title = "What I remember about the night we went drinking",
        body = "", 
        user_id = 1,
        person_id = 2)
    entry3 = Entry( 
        title = "", 
        body = "His enthusiasm for sleeping and for burritos was memorable.",
        user_id = 1,
        person_id = 3)
    entry4 = Entry( 
        title = "Everlong Cover",
        body = "Hello, I\'ve waited here for you\nEverlong\nTonight, I throw myself into\nAnd out of the red\nOut of her head, she sang\n\nCome down, and waste away with me\nDown with me\nSlow, how you wanted it to be\nI\'m over my head\nOut of her head, she sang\n\nAnd I wonder\nWhen I sing along with you\n\nIf everything could ever feel this real forever\nIf anything could ever be this good again\nThe only thing I\'ll ever ask of you\nYou\'ve got to promise not to stop when I say when\nShe sang\n\nBreathe out, so I can breathe you in\nHold you in\nAnd now I know you\'ve always been\nOut of your head, out of my head I sang\n\nAnd I wonder\nWhen I sing along with you\n\nIf everything could ever feel this real forever\nIf anything could ever be this good again\nThe only thing I\'ll ever ask of you\nYou\'ve got to promise not to stop when I say when\nShe sang\n\nAnd I wonder\n\nIf everything could ever feel this real forever\nIf anything could ever be this good again\nThe only thing I\'ll ever ask of you\nYou\'ve got to promise not to stop when I say when",
        user_id = 1,
        person_id = 5
        )
    entry5 = Entry( 
        title = "Walk Like a Panther",
        body = "Marie has set up home\nWith a man who\'s half my age\nA halfwit in a leotard\nStands on my stage\n\nThe standards have fallen\nMy value has dropped\nBut don\'t shed a tear\nSome walk like they own the place\nWhilst others creep in fear\nTry if you can to walk like a man\nBut you don\'t come near\n\nYou\'ve got to fly like an eagle\nProwl like a lion in Africa\nLeap like a salmon\nHome from the sea\nTo keep up with me\nYou\'ve got to walk like a panther tonight\nWalk like a panther tonight\n\nThe old hometown just looks the same\nLike a derelict man who had died out of shame\nLike a jumble sale left out in the rain\nIt\'s not good, it\'s not right\n\nThe standards have fallen\nMy value has dropped\nBut don\'t shed a tear\nSome walk like they own the place\nWhilst others creep in fear\nTry if you can to walk like a man\nBut you, you don\'t come near\n\nYou\'ve got to fly like an eagle\nProwl like a lion in Africa\nLeap like a salmon\nHome from the sea\nTo keep up with me\nYou\'ve got to walk like a panther tonight\nWalk like a panther tonight\n\nWhere did you leave all self-respect?\nYou look like a reptile, your house is a wreck\nYour existence an insult\nStains that are suspect cover your clothes\n\nThe standards have fallen\nMy value has dropped\nBut don\'t shed a tear\nSome walk like they own the place\nWhilst others creep in fear\nTry if you can to walk like a man\nBut you, you don\'t come near\n\nYou\'ve got to fly like an eagle\nProwl like a lion in Africa\nLeap like a salmon\nHome from the sea\nTo keep up with me\nYou\'ve got to walk like a panther tonight\n\nWalk like a panther tonight\nWalk like a panther tonight\nWalk like a panther tonight\n\nYou\'ve got to walk like a panther\nWalk like a panther tonight\n\nTonight\nTonight\nWalk like a panther tonight",
        user_id = 1,
        person_id = 5
        )
    entry6 = Entry(
        title = "Big Bear Trip",
        body = "As the oldest members of the group, we were able to plan and complete logistal tasks the most efficiently.\n\nHe complimented my streamlined dinner plans: \n\t(1) Throw everything into the oven for one hour\n\t(2) Take everything out of the oven\n\t(3) Eat.\n\nSadly, I couldn't join them for skiing. My team was putting finishing touches on a Remember the Milk clone.",
        user_id = 1,
        person_id = 1
        )
    entry7 = Entry(
        title = "Wedding",
        body = "I was invited to be a groomsman at the last minute. The pink tuxedo fit.\n\nVia special request, I will be performing this song: https://www.youtube.com/watch?v=z9zMcvn_xkI",
        user_id = 1,
        person_id = 1
        )
    entry8 = Entry(
        title = "Technical Interview Prep and Boot Camp",
        body = "He lent me \"Programming Interviews Exposed,\" where authors, Morgan, Kindler, and Giguére wrote:\n\n\"Know Yourself. Stereotypes to the contrary, all programmers are not alike. Knowing what kind of programmer you are is crucial to finding the right kind of job.\"\n\nDoes he feel like he's made the right move working as a productivity specialist?",
        user_id = 1,
        person_id = 1
        )

    db.session.add(entry1)
    db.session.add(entry2)
    db.session.add(entry3)
    db.session.add(entry4)
    db.session.add(entry5)
    db.session.add(entry6)
    db.session.add(entry7)
    db.session.add(entry8)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_entries():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
