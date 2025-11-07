from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Character(Base):
    __tablename__ = "characters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    birth_year = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    homeworld = Column(String, nullable=True)
    films = Column(Text, nullable=True)
    description = Column(Text, nullable=True)
    traits = Column(Text, nullable=True)
    key_moments = Column(Text, nullable=True)
    relationships = Column(Text, nullable=True)
    icon = Column(String, nullable=True)

