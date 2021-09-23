from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstName = db.Column(db.String(55), nullable=False)
    lastName = db.Column(db.String(55), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profilePic = db.Column(db.Text, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    project = db.relationship('Project', back_populates='projectOwner')
    teamMember = db.relationship('Team', back_populates="memberId")
    taskOwner = db.relationship('Task', back_populates='userToDoTask')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.firstName,
            'lastName' : self.lastName,
            'email': self.email,
            'profilePic' : self.profilePic,
            'hashed_password': self.hashed_password
        }
