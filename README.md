# LnL - Lists on Lists

LnL is a full stack application built to assist with basic tracking of things that need to be completed for any given project. Logged in users can create multiple projects and many tasks for those projects while tracking their status. Currently LnL is only seeded with a few test "projects" to show feature use as most of the information will come from the user. Visit the live site on Heroku, [Here](https://lnl-live.herokuapp.com/)..

## Architecture
LnL was built on a PostgreSQL database with a Python backend and React frontend.

### Technologies used
* React
* Redux
* Python
* Flask
* PostgreSQL
* AWS S3 (just buckets for now)

## Future Plans
* Styling with modals where a full page is not exactly needed.
* Feature implemenation of Teams that are meant to tackle the project
* Multiple different ways to view the same tasks for a given project, such as a kanban-style board, daily planner with times, and Calendar
* Drag and drop capability for each of the different views
* Due dates with reminders when nearing the deadline
* Search for any user that has created an account instead of a drop down
* In-line editing of tasks, priority status, due dates, and related information




## Running LnL locally

1. Clone this repository

   ```bash
   git clone https://github.com/WellerJay118/capStone.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment, an example is included
   
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. npm start the frontend, flask run the backend
