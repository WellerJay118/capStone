from flask import Blueprint, request
from app.models import Project, db, Team, Task
from flask_login import current_user
from datetime import datetime


project_routes = Blueprint('projects', __name__)

#READ all projects
@project_routes.route('/')
def getAllProj():
    print(current_user)
    projects = Project.query.filter(1 == Project.projOwner)
    return {'projects': [project.proj_to_dict() for project in projects]}

#READ a single project by id
# @project_routes.route('/<int:id>')
# def getProj(id):
#     project = Project.query.get(id)
#     return project.proj_to_dict()

#Create a project
# @project_routes.route('/create', methods=['POST'])
# def createProj():
#     data = request.json
#     newProject = Project(
#         projOwner = current_user.id,
#         projName = data['projName'],
#         projDesc = data['projDesc'],
#         projStatus = data['projStatus'],
#         created_at = datetime.now()
#     )
#     db.session.add(newProject)
#     db.session.commit()
#     payload = newProject.proj_to_dict()
#     return payload

#UPDATE a single projects Name, Description, Status, updated at time
# @project_routes.route('/<int:id>', methods=['PATCH'])
# def editProj(id):
#     data = request.json
#     project = Project.query.get(id)
#     project.projName = data['projName']
#     project.projDesc = data['projDesc']
#     project.projStatus = data['projStatus']
#     project.updated_at = datetime.now()

#     db.session.add(project)
#     db.session.commit()
#     return "Project updated"

#DELETE project
# @project_routes.route('/<int:id>', methods=['DELETE'])
# def deleteProj(id):
#     project = Project.query.get(id)
#     db.session.delete(project)
#     db.session.commit()
#     return "Project deleted"

############# TASKS ###############

#READ ALL tasks
# @project_routes.route('/<int:id>/tasks')
# def getAllTasks(id):
#     tasks = Task.query.filter(id == Task.projId).all()
#     return {'tasks': [task.task_to_dict() for task in tasks]}

#Read a single task
# @project_routes.route('/<int:id>/tasks/<int:taskId>')
# def getTask(id, taskId):
#     task = Task.query.get(taskId)
#     return task.task_to_dict()

#CREATE a single task
# @project_routes.route('/<int:id>/tasks/create', methods=["POST"])
# def createTask(id):
#     data = request.json
#     newTask = Task(
#         assignedTo = current_user.id,
#         projId = id,
#         taskBody = data['taskBody'],
#         taskStatus = data['taskStatus'],
#         taskPriority = data['taskPriority'],
#         created_at = datetime.now()
#     )
#     db.session.add(newTask)
#     db.session.commit()
#     payload = newTask.task_to_dict()
#     return payload

#UPDATE a single task
# @project_routes.route('/<int:id>/tasks/<int:taskId>', methods=['PATCH'])
# def editTask(id, taskId):
#     data = request.json
#     task = Task.query.get(taskId)
#     task.assignedTo = data['assignedTo'],
#     task.projId = id,
#     task.taskBody = data['taskBody'],
#     task.taskStatus = data['taskStatus'],
#     task.taskPriority = data['taskPriority'],
#     task.updated_at = datetime.now()

#     db.session.add(task)
#     db.session.commit()
#     return 'Task updated'

#DELETE a single task
# @project_routes.route('/<int:id>/tasks/<int:taskId>', methods=['DELETE'])
# def deleteTask(id, taskId):
#     task = Task.query.get(taskId)
#     db.session.delete(task)
#     db.session.commit()
#     return "Task deleted"


############### Teams #################

#READ a projects team
# @project_routes.route('/<int:id>/team')
# def getTeam(id):
#     team = Team.query.filter(id == Team.projId)
#     return team.team_to_dict()

#CREATE a project team
#when creating a team, the person creating the team is the first member of the team.
# @project_routes.route('/<int:id>/team/create')
# def createTeam(id):
#     data = request.json
#     newTeam = Team(
#         teamName = data['teamName'],
#         teamMemberId = current_user.id,
#         role = data['role'],
#         projId = id
#     )
#     db.session.add(newTeam)
#     db.session.commit()
#     payload = newTeam.team_to_dict()
#     return payload

#EDIT a projects team
#Have to add teamMember, remove teamMember, NO EDIT to team name
# @project_routes.route()
# MAYBE DO IT LIKE FOLLOWERS

#DELETE a projects team
# @project_routes.route('/<int:id>/team/<int:teamId>')
# def deleteTeam(id, teamId):
#     team = Team.query.get(teamId)
#     db.session.delete(team)
#     db.session.commit()
#     return "Team Deleted"
