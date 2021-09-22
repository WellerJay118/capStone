from app.models import db, Team

def seed_teams():
    teamOne = Team(
        teamName="Alpha", teamMemberId=1, role="Scrum Lord", projId=1
    )
    teamTwo = Team(
        teamName="Beta", teamMemberId=2, role="Doer", projId=2
    )
    teamThree = Team(
        teamName="Charlie", teamMemberId=3, role="Baron", projId=3
    )

    db.session.add(teamOne)
    db.session.add(teamTwo)
    db.session.add(teamThree)

    db.session.commit()


def undo_teams():
    db.session.execute('TRUNCATE teams RESTART IDENTITY CASCADE;')
    db.session.commit()
