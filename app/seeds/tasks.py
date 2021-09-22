from app.models import db, Task
from datetime import datetime

def seed_tasks():
    taskOne = Task(
        assignedTo=1 , projId=3 , taskBody="Do the things 1", taskStatus="TODO", taskPriority="Low", created_at=datetime.now()
    )
    taskTwo = Task(
        assignedTo=2 , projId=2 , taskBody="Do the things 2", taskStatus="TODO", taskPriority="Medium", created_at=datetime.now()
    )
    taskThree = Task(
        assignedTo=3 , projId=1 , taskBody="Do the things 3", taskStatus="TODO", taskPriority="High", created_at=datetime.now()
    )
    taskFour = Task(
        assignedTo=1 , projId=3 , taskBody="Do the things 4", taskStatus="TODO", taskPriority="Critical", created_at=datetime.now()
    )
    taskFive = Task(
        assignedTo=2 , projId=2 , taskBody="Do the things 5", taskStatus="TODO", taskPriority="Medium", created_at=datetime.now()
    )
    taskSix = Task(
        assignedTo=3 , projId=1 , taskBody="Do the things 6", taskStatus="Approved", taskPriority="Medium", created_at=datetime.now()
    )
    taskSeven = Task(
        assignedTo=3 , projId=1 , taskBody="Do the things 7", taskStatus="Complete", taskPriority="Low", created_at=datetime.now()
    )
    taskEight = Task(
        assignedTo=3 , projId=1 , taskBody="Do the things 8", taskStatus="In Progress", taskPriority="Critical", created_at=datetime.now()
    )

    db.session.add(taskOne)
    db.session.add(taskTwo)
    db.session.add(taskThree)
    db.session.add(taskFour)
    db.session.add(taskFive)
    db.session.add(taskSix)
    db.session.add(taskSeven)
    db.session.add(taskEight)
    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
