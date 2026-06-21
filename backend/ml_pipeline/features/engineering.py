import pandas as pd
import numpy as np

def create_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Generate ML features from historical OHLCV data.
    """
    data = df.copy()
    
    # Ensure it's sorted by date
    if not isinstance(data.index, pd.DatetimeIndex):
        if 'Date' in data.columns:
            data['Date'] = pd.to_datetime(data['Date'])
            data.set_index('Date', inplace=True)
            
    # Calculate Returns
    data['Return'] = data['Close'].pct_change()
    
    # Lag features
    for lag in [1, 2, 3, 5, 10]:
        data[f'Return_Lag_{lag}'] = data['Return'].shift(lag)
        
    # Volatility
    data['Volatility_10'] = data['Return'].rolling(window=10).std()
    data['Volatility_30'] = data['Return'].rolling(window=30).std()
    
    # Momentum (Rate of Change)
    data['ROC_10'] = data['Close'].pct_change(periods=10)
    data['ROC_30'] = data['Close'].pct_change(periods=30)
    
    # Target Variable (e.g. Next day return)
    data['Target'] = data['Return'].shift(-1)
    
    # Drop rows with NaN values created by rolling/shifting
    data.dropna(inplace=True)
    
    return data
