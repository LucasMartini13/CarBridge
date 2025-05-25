from pydantic import BaseModel

class OrderCreate(BaseModel):
    item_name: str
    quantity: int

class OrderOut(BaseModel):
    id: int
    item_name: str
    quantity: int
    status: str
    user_id: int

    class Config:
        orm_mode = True