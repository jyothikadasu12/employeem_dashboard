
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import employees, tasks, dashboard

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Explore - Employee Task Tracker",
    description="Employee and task management API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def root():
    return {"message": "Explore Employee Task Tracker API is running"}

app.include_router(dashboard.router)
app.include_router(employees.router)
app.include_router(tasks.router)


