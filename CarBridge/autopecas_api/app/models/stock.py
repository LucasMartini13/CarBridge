from sqlalchemy import Column, Integer, String
from app.db.database import Base

class Stock(Base):
    __tablename__ = "stock"
    id = Column(Integer, primary_key=True, index=True)
    part_name = Column(String, unique=True, index=True)
    quantity = Column(Integer)