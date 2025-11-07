from pydantic import BaseModel
from typing import Optional


class CharacterBase(BaseModel):
    name: str
    birth_year: Optional[str] = None
    gender: Optional[str] = None
    homeworld: Optional[str] = None
    films: Optional[str] = None
    description: Optional[str] = None
    traits: Optional[str] = None
    key_moments: Optional[str] = None
    relationships: Optional[str] = None
    icon: Optional[str] = None


class CharacterCreate(CharacterBase):
    pass


class Character(CharacterBase):
    id: int

    class Config:
        from_attributes = True

