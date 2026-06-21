from sklearn.ensemble import GradientBoostingRegressor
import numpy as np
import pandas as pd
from typing import Dict, Any

class BaselineXGBoost:
    """
    Using scikit-learn's GradientBoostingRegressor as a lightweight baseline 
    to avoid heavy XGBoost compilation issues during dev.
    """
    def __init__(self):
        self.model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=3)
        self.is_trained = False
        self.features_col = []

    def train(self, df: pd.DataFrame, target_col: str = 'Target'):
        self.features_col = [c for c in df.columns if c != target_col and c not in ['Open', 'High', 'Low', 'Close', 'Volume']]
        
        X = df[self.features_col]
        y = df[target_col]
        
        self.model.fit(X, y)
        self.is_trained = True
        return self

    def predict(self, df: pd.DataFrame) -> np.ndarray:
        if not self.is_trained:
            raise ValueError("Model is not trained yet.")
        X = df[self.features_col]
        return self.model.predict(X)
