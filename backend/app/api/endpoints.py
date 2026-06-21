from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from app.services.market_data import fetch_stock_history, fetch_stock_info
from app.services.indicators import add_all_indicators
from ml_pipeline.features.engineering import create_features
from ml_pipeline.models.xgboost_model import BaselineXGBoost
from app.services.recommendation import generate_recommendation

router = APIRouter()

# Global mock model for demonstration (In production, load saved models)
model = BaselineXGBoost()

@router.get("/predict/{symbol}")
async def predict_stock(symbol: str):
    """
    Get prediction and recommendation for a specific stock symbol.
    """
    df = await fetch_stock_history(symbol, period="2y", interval="1d")
    if df is None or df.empty:
        raise HTTPException(status_code=404, detail="Stock data not found")
        
    # 1. Add Technical Indicators
    df = add_all_indicators(df)
    
    # 2. Create ML Features
    df_features = create_features(df)
    
    # Simple training loop for demonstration (trains on historical, predicts next day)
    # In a real app, the model would be pre-trained.
    if len(df_features) > 100:
        # Train on all but last row
        train_df = df_features.iloc[:-1]
        model.train(train_df)
        
        # Predict on last row
        latest_data = df_features.iloc[-1:]
        prediction = model.predict(latest_data)
        predicted_return = prediction[0]
    else:
        predicted_return = 0.0 # Not enough data
        
    # 3. Get latest indicators for recommendation
    latest_rsi = df['RSI_14'].iloc[-1]
    latest_macd_hist = df['MACD_Hist'].iloc[-1]
    
    # 4. Generate Recommendation
    rec = generate_recommendation(
        predicted_return=predicted_return,
        current_rsi=latest_rsi if not pd.isna(latest_rsi) else 50,
        current_macd_hist=latest_macd_hist if not pd.isna(latest_macd_hist) else 0
    )
    
    # Get basic info
    info = await fetch_stock_info(symbol)
    
    return {
        "symbol": symbol.upper(),
        "company_name": info.get("longName", symbol) if info else symbol,
        "current_price": df['Close'].iloc[-1],
        "recommendation": rec
    }
