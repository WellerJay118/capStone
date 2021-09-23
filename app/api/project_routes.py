from flask import Blueprint
from app.models import Project
from flask_login import current_user


project_routes = Blueprint('projects', __name__)

@project_routes.route('/')
def getAllProj():
    projects = Project.query.filter(current_user.id == Project.projOwner).all()
    return {'projects': [project.proj_to_dict() for project in projects]}

@project_routes.route('/<int:id>')
def getProj(id):
    project = Project.query.get(id)
    return project.proj_to_dict()
