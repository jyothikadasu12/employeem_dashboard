
# Explore – Employee Task Tracker

A full-stack employee and task management application built
using React, TypeScript, Tailwind CSS, Python FastAPI,
SQLAlchemy, and PostgreSQL.

## Features

### Employee Management
- Add employees.
- View employee details.
- Delete employees.
- Prevent duplicate email addresses.

### Task Management
- Create tasks.
- Add task descriptions.
- Set task priority.
- Set due dates.
- Assign tasks to employees.
- Update task status.

### Dashboard
- Total employees.
- Total tasks.
- Completed tasks.
- Pending tasks.
- Recent task overview.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Language | TypeScript |
| Styling | Tailwind CSS + External CSS |
| Routing | React Router |
| HTTP Client | Axios |
| Backend | Python FastAPI |
| ORM | SQLAlchemy |
| Database | PostgreSQL |
| API Documentation | Swagger UI |

## Project Structure

explore/
├── explore-frontend/
├── explore-backend/
└── README.md

## Prerequisites

- Node.js and npm
- Python 3.10+
- PostgreSQL
- Git
- VS Code

## Database Setup

Create a PostgreSQL database:

CREATE DATABASE explore_db;

Configure the database connection inside:

explore-backend/.env

DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/explore_db

## Backend Setup

Open a terminal:

cd explore-backend

python -m venv venv

Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Start the backend:

uvicorn app.main:app --reload

Backend:

http://127.0.0.1:8000

Swagger:

http://127.0.0.1:8000/docs

## Frontend Setup

Open another terminal:

cd explore-frontend

npm install

Start frontend:

npm run dev

Frontend:

http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/employees/ | List employees |
| POST | /api/employees/ | Create employee |
| DELETE | /api/employees/{id} | Delete employee |
| GET | /api/tasks/ | List tasks |
| POST | /api/tasks/ | Create task |
| PATCH | /api/tasks/{id}/status | Update task status |
| GET | /api/dashboard/summary | Dashboard statistics |

## Application Workflow

1. Create an employee.
2. View the employee directory.
3. Create a task.
4. Assign the task to an employee.
5. Update task status.
6. View updated dashboard statistics.

## Database Design

Employees:
- id
- name
- email
- department

Tasks:
- id
- title
- description
- priority
- due_date
- status
- employee_id

Relationship:

One employee can have many tasks.

## Running the Application

Run the backend and frontend in separate terminals.

The frontend communicates with FastAPI using Axios.
FastAPI reads and writes records using SQLAlchemy
and PostgreSQL.

## Future Improvements

- Employee search.
- Task filtering.
- Authentication.
- Pagination.
- Unit and integration testing.
- Alembic database migrations.

## Author

Explore – Employee Task Tracker
Full Stack Practical Assignment
