from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import init_db
from app.routers import characters
import os

app = FastAPI(title="StarFolk Wiki API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    init_db()

app.include_router(characters.router, prefix="/characters", tags=["characters"])

static_data_dir = "/app/static-data"
if os.path.exists(static_data_dir):
    app.mount("/data", StaticFiles(directory=static_data_dir), name="data")
else:
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base_dir, "data")
    if os.path.exists(data_dir):
        app.mount("/data", StaticFiles(directory=data_dir), name="data")

@app.get("/")
async def root():
    return {"message": "StarFolk Wiki API"}

