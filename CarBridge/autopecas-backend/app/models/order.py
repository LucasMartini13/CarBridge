from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String, index=True)
    quantity = Column(Integer)
    status = Column(String, default="pendente")
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User")