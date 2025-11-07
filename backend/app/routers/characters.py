from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app import models, schemas

router = APIRouter()


@router.get("/", response_model=List[schemas.Character])
def get_characters(
    search: Optional[str] = Query(None, description="Search characters by name"),
    db: Session = Depends(get_db)
):
    """Retrieve all characters, optionally filtered by search query."""
    query = db.query(models.Character)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(models.Character.name.ilike(search_term))
    
    characters = query.all()
    return characters


@router.get("/{character_id}", response_model=schemas.Character)
def get_character(character_id: int, db: Session = Depends(get_db)):
    """Retrieve a specific character by ID."""
    character = db.query(models.Character).filter(models.Character.id == character_id).first()
    
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")
    
    return character

