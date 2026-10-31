
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(prefix="/api/employees", tags=["Employees"])


@router.get("/", response_model=list[schemas.EmployeeResponse])
def list_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)


@router.post("/", response_model=schemas.EmployeeResponse, status_code=201)
def add_employee(
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db)
):
    try:
        return crud.create_employee(db, employee)
    except ValueError as error:
        raise HTTPException(status_code=409, detail=str(error))


@router.delete("/{employee_id}")
def remove_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    deleted = crud.delete_employee(db, employee_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"message": "Employee deleted successfully"}
