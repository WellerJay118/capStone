from app.models import db, Project
from datetime import datetime

def seed_projects():

    projOne = Project(
        projOwner=1 , projName="proj1", projDesc="proj1 description", projStatus="In Progress", teamId="", created_at=datetime.now()
    )
    projTwo = Project(
        projOwner=2 , projName="proj2", projDesc="description of proj2", projStatus="In Progress", teamId="", created_at=datetime.now()
    )
    projThree = Project(
        projOwner=3 , projName="proj3", projDesc="things and stuff", projStatus="Planning", teamId="", created_at=datetime.now()
    )
    projFour = Project(
        projOwner=1 , projName="proj4", projDesc="pretend professionalism", projStatus="Planning", teamId="", created_at=datetime.now()
    )
    projFive = Project(
        projOwner=1 , projName="proj5", projDesc="get some hwbbq", projStatus="", teamId="Complete", created_at=datetime.now()
    )

    db.session.add(projOne)
    db.session.add(projTwo)
    db.session.add(projThree)
    db.session.add(projFour)
    db.session.add(projFive)
    db.session.commit()


def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
