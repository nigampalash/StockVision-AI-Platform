# 📈 StockVision AI Platform

StockVision AI is a premium, modern, and highly responsive web application designed for next-generation stock market analysis and AI-driven portfolio management. It features a beautiful dark and light mode UI, real-time simulated market data, predictive alerts, and an intelligent auto-trading simulator.

## ✨ Features

- **Dynamic Theme Engine:** Seamlessly toggle between a premium Dark Mode and a crisp Light Mode.
- **Real-time Market Dashboard:** Live tracking of major indices and popular stocks with interactive mock data.
- **Portfolio Management:** Track your holdings, visualize asset allocation, and calculate total balance and daily returns.
- **AI-Powered Alerts:** Setup custom condition-based alerts (e.g., price drops) and view AI recommendation triggers.
- **Settings & Profile:** Manage user preferences, risk tolerance, and auto-trading settings.
- **Responsive Design:** Fully optimized for desktop and mobile viewing with a sleek glassmorphism aesthetic.

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theming:** `next-themes`
- **Charts:** [Recharts](https://recharts.org/) & TradingView Widget integration

### Backend (API Engine)
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Server:** Uvicorn
- **Integration:** WebSockets for real-time market simulation data

## 🚀 Getting Started

Follow these steps to run the platform locally on your machine.

### Prerequisites
- Node.js (v18 or higher)
- Python (3.9 or higher)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/nigampalash/StockVision-AI-Platform.git
cd StockVision-AI-Platform
```

### 2. Start the Backend (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
The backend API will be available at `http://localhost:8000`.

### 3. Start the Frontend (Next.js)
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The frontend UI will be available at `http://localhost:3000`.

## 📂 Project Structure

```text
StockVision-AI-Platform/
├── backend/                # Python FastAPI server
│   ├── main.py             # API endpoints and WebSockets
│   └── requirements.txt    # Python dependencies
└── frontend/               # Next.js web application
    ├── src/app/            # Application routes (Markets, Portfolio, Settings, etc.)
    ├── src/components/     # Reusable React components (Sidebar, Topbar, Layout)
    ├── globals.css         # Tailwind v4 configuration and global themes
    └── package.json        # Node.js dependencies
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/nigampalash/StockVision-AI-Platform/issues).

## 📄 License

This project is licensed under the MIT License.
