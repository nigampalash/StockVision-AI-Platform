import pandas as pd
import numpy as np

def calculate_sma(data: pd.Series, window: int) -> pd.Series:
    return data.rolling(window=window).mean()

def calculate_ema(data: pd.Series, window: int) -> pd.Series:
    return data.ewm(span=window, adjust=False).mean()

def calculate_rsi(data: pd.Series, window: int = 14) -> pd.Series:
    delta = data.diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
    
    rs = gain / loss
    rsi = 100 - (100 / (1 + rs))
    return rsi

def calculate_macd(data: pd.Series, fast_period=12, slow_period=26, signal_period=9):
    ema_fast = calculate_ema(data, fast_period)
    ema_slow = calculate_ema(data, slow_period)
    macd = ema_fast - ema_slow
    signal = calculate_ema(macd, signal_period)
    histogram = macd - signal
    return macd, signal, histogram

def add_all_indicators(df: pd.DataFrame) -> pd.DataFrame:
    """
    Adds common technical indicators to an OHLCV DataFrame.
    Assumes 'Close' column exists.
    """
    if 'Close' not in df.columns:
        return df

    df['SMA_20'] = calculate_sma(df['Close'], 20)
    df['SMA_50'] = calculate_sma(df['Close'], 50)
    df['EMA_20'] = calculate_ema(df['Close'], 20)
    df['RSI_14'] = calculate_rsi(df['Close'], 14)
    
    macd, signal, hist = calculate_macd(df['Close'])
    df['MACD'] = macd
    df['MACD_Signal'] = signal
    df['MACD_Hist'] = hist
    
    return df
