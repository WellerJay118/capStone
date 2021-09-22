from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', firstName="Robert", lastName="Knievel", email='demo@aa.io', profilePic="https://jw-capstone-bucket.s3.us-east-2.amazonaws.com/Demouserprofilepic.jpg", password='password')
    marnie = User(
        username='Marnie', firstName="Margret", lastName="Marnariousdottir", email='marnie@aa.io', profilePic="https://jw-capstone-bucket.s3.us-east-2.amazonaws.com/Marnieprofilepic.jpg", password='password')
    bobbie = User(
        username='Bobbie', firstName="James", lastName="Chipson", email='bobbie@aa.io', profilePic='https://jw-capstone-bucket.s3.us-east-2.amazonaws.com/JamesChipsonprofilepic.jpg', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
