
from datetime import date
from pydantic import BaseModel, EmailStr, ConfigDict
from app.models import TaskStatus, TaskPriority


class EmployeeCreate(BaseModel):
    name: str
    email: EmailStr
    department: str


class EmployeeResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    department: str

    model_config = ConfigDict(from_attributes=True)


class TaskCreate(BaseModel):
    title: str
    description: str = ""
    priority: TaskPriority = TaskPriority.MEDIUM
    due_date: date
    employee_id: int


class TaskStatusUpdate(BaseModel):
    status: TaskStatus


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    priority: TaskPriority
    due_date: date
    status: TaskStatus
    employee_id: int
    employee_name: str

    model_config = ConfigDict(from_attributes=True)


class DashboardResponse(BaseModel):
    total_employees: int
    total_tasks: int
    completed_tasks: int
    pending_tasks: int
