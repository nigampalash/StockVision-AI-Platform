from enum import Enum
from typing import Dict, Any

class RecommendationAction(str, Enum):
    STRONG_BUY = "STRONG BUY"
    BUY = "BUY"
    HOLD = "HOLD"
    SELL = "SELL"
    STRONG_SELL = "STRONG_SELL"

def generate_recommendation(predicted_return: float, current_rsi: float, current_macd_hist: float) -> Dict[str, Any]:
    """
    Generate a recommendation based on ML predicted return and technical indicators.
    """
    score = 50 # Base score 0-100
    
    # 1. Evaluate Predicted Return
    if predicted_return > 0.02:
        score += 20
    elif predicted_return > 0.005:
        score += 10
    elif predicted_return < -0.02:
        score -= 20
    elif predicted_return < -0.005:
        score -= 10
        
    # 2. Evaluate RSI
    if current_rsi < 30: # Oversold
        score += 15
    elif current_rsi > 70: # Overbought
        score -= 15
        
    # 3. Evaluate MACD
    if current_macd_hist > 0:
        score += 10
    elif current_macd_hist < 0:
        score -= 10
        
    # Cap score between 0 and 100
    score = max(0, min(100, score))
    
    # Determine Action
    if score >= 80:
        action = RecommendationAction.STRONG_BUY
    elif score >= 60:
        action = RecommendationAction.BUY
    elif score >= 40:
        action = RecommendationAction.HOLD
    elif score >= 20:
        action = RecommendationAction.SELL
    else:
        action = RecommendationAction.STRONG_SELL
        
    return {
        "action": action,
        "confidence_score": score,
        "predicted_return": predicted_return,
        "reasoning": f"Generated based on predicted short-term return ({predicted_return:.2%}), RSI ({current_rsi:.1f}), and MACD momentum."
    }
