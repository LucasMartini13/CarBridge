from pydantic import BaseModel

class StockCreate(BaseModel):
    part_name: str
    quantity: int

class StockOut(BaseModel):
    id: int
    part_name: str
    quantity: int

    class Config:
        from_attributes = True