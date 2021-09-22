from .db import db

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    assignedTo = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    projId = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    taskBody = db.Column(db.Text, nullable=False)
    taskStatus = db.Column(db.String(75))
    taskPriority = db.Column(db.String(75))
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True))

    userToDoTask = db.relationship('User', back_populates='task')
    project = db.relationship('Project', back_populates='task')

    # def task_to_dict():
    #     return (

    #     )
