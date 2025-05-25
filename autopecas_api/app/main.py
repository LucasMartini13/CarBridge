from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal, engine
from app.models import user as models
from app.schemas import user as schemas
from app.services import auth
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Usuário já cadastrado")
    hashed_pw = auth.get_password_hash(user.password)
    new_user = models.User(username=user.username, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"msg": "Usuário criado com sucesso"}

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Usuário ou senha inválidos")
    token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

# Pedidos
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderOut

@app.post("/orders", response_model=OrderOut)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    new_order = Order(item_name=order.item_name, quantity=order.quantity, user_id=1)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order

@app.get("/orders", response_model=list[OrderOut])
def list_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()

# Estoque
from app.models.stock import Stock
from app.schemas.stock import StockCreate, StockOut

@app.post("/stock", response_model=StockOut)
def add_stock(stock: StockCreate, db: Session = Depends(get_db)):
    item = db.query(Stock).filter_by(part_name=stock.part_name).first()
    if item:
        item.quantity += stock.quantity
    else:
        item = Stock(part_name=stock.part_name, quantity=stock.quantity)
        db.add(item)
    db.commit()
    db.refresh(item)
    return item

@app.get("/stock", response_model=list[StockOut])
def get_stock(db: Session = Depends(get_db)):
    return db.query(Stock).all()

# Rastreamento
from app.models.tracking import Tracking
from app.schemas.tracking import TrackingCreate, TrackingOut

@app.post("/tracking", response_model=TrackingOut)
def create_tracking(data: TrackingCreate, db: Session = Depends(get_db)):
    tracking = Tracking(order_id=data.order_id, status=data.status)
    db.add(tracking)
    db.commit()
    db.refresh(tracking)
    return tracking

@app.get("/tracking", response_model=list[TrackingOut])
def get_all_tracking(db: Session = Depends(get_db)):
    return db.query(Tracking).all()

@app.get("/tracking/{order_id}", response_model=list[TrackingOut])
def get_tracking_by_order(order_id: int, db: Session = Depends(get_db)):
    return db.query(Tracking).filter(Tracking.order_id == order_id).all()