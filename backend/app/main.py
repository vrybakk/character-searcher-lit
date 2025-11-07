from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db
from app.routers import characters

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

@app.get("/")
async def root():
    return {"message": "StarFolk Wiki API"}

