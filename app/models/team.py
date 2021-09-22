from .db import db

class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    teamName = db.Column(db.String(255), nullable=False)
    teamMemberId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    role = db.Column(db.String(75), nullable=False)
    projId = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

    memberId = db.relationship('User', back_populates='teamMember')
    project = db.relationship('Project', cascade='all, delete', back_populates='projTeam')


    def team_to_dict(self):
      return {
        'id' : self.id,
        'teamName' : self.teamName,
        'teamMemberId' : self.teamMemberId,
        'role' : self.role,
        'projId' : self.projId,
        'created_at': self.created_at,
        'updated_at': self.updated_at,
      }
