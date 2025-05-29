from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import datetime

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="Pendente")
    created_at = Column(DateTime, default=datetime.utcnow)
    itens = relationship("OrderItem", back_populates="order")