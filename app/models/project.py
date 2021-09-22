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


    projectOwner = db.relationship('User', back_populates='project')
    projTeam = db.relationship('Team', cascade='all, delete', back_populates='project')

    def project_to_dict(self):
        return {
            'id' : self.id,
            'projOwner' : self.projOwner,
            'projName' : self.projName,
            'projDesc' : self.projDesc,
            'projStatus' : self.projStatus,
            'teamId' : self.teamId,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
