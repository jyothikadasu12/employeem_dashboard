
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import IntegrityError

from app import models, schemas


def get_employees(db: Session):
    return db.query(models.Employee).order_by(
        models.Employee.id.desc()
    ).all()


def create_employee(db: Session, data: schemas.EmployeeCreate):
    employee = models.Employee(**data.model_dump())

    try:
        db.add(employee)
        db.commit()
        db.refresh(employee)
        return employee
    except IntegrityError:
        db.rollback()
        raise ValueError("An employee with this email already exists")


def delete_employee(db: Session, employee_id: int):
    employee = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if not employee:
        return False

    db.delete(employee)
    db.commit()
    return True


def get_tasks(db: Session):
    return (
        db.query(models.Task)
        .options(joinedload(models.Task.employee))
        .order_by(models.Task.id.desc())
        .all()
    )


def create_task(db: Session, data: schemas.TaskCreate):
    employee = db.query(models.Employee).filter(
        models.Employee.id == data.employee_id
    ).first()

    if not employee:
        raise ValueError("Employee not found")

    task = models.Task(**data.model_dump())

    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def update_task_status(
    db: Session,
    task_id: int,
    status: models.TaskStatus
):
    task = db.query(models.Task).filter(
        models.Task.id == task_id
    ).first()

    if not task:
        return None

    task.status = status
    db.commit()
    db.refresh(task)
    return task


def get_dashboard_summary(db: Session):
    total_employees = db.query(models.Employee).count()
    total_tasks = db.query(models.Task).count()

    completed = db.query(models.Task).filter(
        models.Task.status == models.TaskStatus.COMPLETED
    ).count()

    pending = db.query(models.Task).filter(
        models.Task.status == models.TaskStatus.PENDING
    ).count()

    return {
        "total_employees": total_employees,
        "total_tasks": total_tasks,
        "completed_tasks": completed,
        "pending_tasks": pending
    }
