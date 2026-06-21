from sqlalchemy import Column, String, Float, DateTime, ForeignKey, func, Boolean
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base

class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(String, primary_key=True, default=lambda: uuid.uuid4().hex, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    total_value = Column(Float, default=0.0)
    risk_score = Column(Float, default=0.0)

    transactions = relationship("Transaction", back_populates="portfolio")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String, primary_key=True, default=lambda: uuid.uuid4().hex, index=True)
    portfolio_id = Column(String, ForeignKey("portfolios.id"), nullable=False)
    stock_symbol = Column(String, index=True, nullable=False)
    type = Column(String, nullable=False) # 'buy' or 'sell'
    quantity = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now())

    portfolio = relationship("Portfolio", back_populates="transactions")

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, default=lambda: uuid.uuid4().hex, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    symbol = Column(String, index=True, nullable=False)
    condition = Column(String, nullable=False) # e.g. 'PRICE_ABOVE', 'RSI_BELOW'
    threshold = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True)
