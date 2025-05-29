from pydantic import BaseModel
from typing import List
from datetime import datetime

class OrderItemOut(BaseModel):
    item_name: str
    quantity: int

    class Config:
        from_attributes = True

class OrderOut(BaseModel):
    id: int
    status: str
    created_at: datetime
    itens: list[OrderItemOut]

    class Config:
        from_attributes = True

class OrderItemCreate(BaseModel):
    item_name: str
    quantity: int

class OrderCreate(BaseModel):
    itens: List[OrderItemCreate]