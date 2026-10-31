
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas, models

router = APIRouter(prefix="/api/tasks", tags=["Tasks"])


def serialize_task(task):
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description or "",
        "priority": task.priority,
        "due_date": task.due_date,
        "status": task.status,
        "employee_id": task.employee_id,
        "employee_name": task.employee.name
    }


@router.get("/")
def list_tasks(db: Session = Depends(get_db)):
    tasks = crud.get_tasks(db)
    return [serialize_task(task) for task in tasks]


@router.post("/", status_code=201)
def add_task(
    task: schemas.TaskCreate,
    db: Session = Depends(get_db)
):
    try:
        created = crud.create_task(db, task)
        return serialize_task(
            db.query(models.Task)
            .filter(models.Task.id == created.id)
            .first()
        )
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))


@router.patch("/{task_id}/status")
def change_task_status(
    task_id: int,
    data: schemas.TaskStatusUpdate,
    db: Session = Depends(get_db)
):
    task = crud.update_task_status(db, task_id, data.status)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return {"message": "Task status updated", "status": task.status}
