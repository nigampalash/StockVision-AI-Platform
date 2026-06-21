from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
import uuid

from app.core.database import get_db
from app.models.portfolio import Portfolio, Transaction
from app.models.user import User
from app.core.security import SECRET_KEY, ALGORITHM
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=401, detail="Could not validate credentials")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

class TransactionCreate(BaseModel):
    stock_symbol: str
    type: str # 'buy' or 'sell'
    quantity: float
    price: float

@router.get("/")
def get_portfolio(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = db.query(Portfolio).filter(Portfolio.user_id == current_user.id).first()
    if not portfolio:
        # Create default portfolio
        portfolio = Portfolio(user_id=current_user.id, name="My Portfolio")
        db.add(portfolio)
        db.commit()
        db.refresh(portfolio)
    
    transactions = db.query(Transaction).filter(Transaction.portfolio_id == portfolio.id).all()
    return {
        "portfolio": {
            "id": portfolio.id,
            "name": portfolio.name,
            "total_value": portfolio.total_value,
            "risk_score": portfolio.risk_score
        },
        "transactions": transactions
    }

@router.post("/transaction")
def add_transaction(tx: TransactionCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = db.query(Portfolio).filter(Portfolio.user_id == current_user.id).first()
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
        
    new_tx = Transaction(
        portfolio_id=portfolio.id,
        stock_symbol=tx.stock_symbol.upper(),
        type=tx.type,
        quantity=tx.quantity,
        price=tx.price
    )
    db.add(new_tx)
    db.commit()
    return {"message": f"Successfully recorded {tx.type} of {tx.quantity} {tx.stock_symbol}"}
