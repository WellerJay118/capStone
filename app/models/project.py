from .db import db

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    projOwner = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    projName = db.Column(db.String(255), nullable=False)
    projDesc = db.Column(db.Text, nullable=False)
    projStatus = db.Column(db.String(50))
    teamId = db.Column(db.Integer, db.ForeignKey('teams.id'))
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True))


    projOwner = db.relationship('User', back_populates='project')
    projTeam = db.relationship('Team', back_populates='project') #looks at table Team 'project'
    # assignedTask = db.relationship('Task', back_populates='project')
    # assignedTeam = db.relationship('Team', back_populates='project')

    # def project_to_dict():
    #     return (

    #     )
