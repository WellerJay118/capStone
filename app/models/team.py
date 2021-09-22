from .db import db

class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    teamName = db.Column(db.String(255), nullable=False)
    teamMemberId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    role = db.Column(db.String(75), nullable=False)
    projId = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True))

    memberId = db.relationship('User', back_populates='team')
    project = db.relationship('Project', back_populates='team')


  # def team_to_dict():
    #     return (

    #     )
