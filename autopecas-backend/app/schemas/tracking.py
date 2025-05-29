from pydantic import BaseModel

class TrackingCreate(BaseModel):
    order_id: int
    status: str

class TrackingOut(BaseModel):
    id: int
    order_id: int
    status: str

class Config:
    orm_mode = True
    from_attributes = True