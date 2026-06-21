import yfinance as yf
import pandas as pd
from typing import Optional, Dict, Any

async def fetch_stock_history(symbol: str, period: str = "1y", interval: str = "1d") -> Optional[pd.DataFrame]:
    """
    Fetch historical OHLCV data for a given symbol.
    """
    try:
        ticker = yf.Ticker(symbol)
        history: pd.DataFrame = ticker.history(period=period, interval=interval)
        if history.empty:
            return None
        return history
    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")
        return None

async def fetch_stock_info(symbol: str) -> Optional[Dict[str, Any]]:
    """
    Fetch company info and fundamentals.
    """
    try:
        ticker = yf.Ticker(symbol)
        info = ticker.info
        return info
    except Exception as e:
        print(f"Error fetching info for {symbol}: {e}")
        return None
