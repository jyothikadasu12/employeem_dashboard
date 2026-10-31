
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/summary", response_model=schemas.DashboardResponse)
def dashboard_summary(db: Session = Depends(get_db)):
    return crud.get_dashboard_summary(db)
