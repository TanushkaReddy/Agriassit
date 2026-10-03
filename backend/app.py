import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(ROOT_DIR))
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from models.user_model import User
from models.prediction_model import Prediction
from routes.user_routes import router as user_router
from routes.weather_routes import router as weather_router
from routes.crop_routes import router as crop_router
from routes.yield_routes import router as yield_router
from routes.fertilizer_routes import router as fertilizer_router
from routes.soil_routes import router as soil_router
from routes.scheme_routes import router as scheme_router
from routes.insurance_routes import router as insurance_router
from routes.expense_routes import router as expense_router
from routes.prediction_routes import router as prediction_router
from routes.dashboard_routes import router as dashboard_router
from routes.profile_routes import router as profile_router
# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="AgriAssist API",
    description="Smart Agriculture Decision Support System",
    version="1.0.0"
)

# Include routers
app.include_router(user_router)
app.include_router(weather_router)
app.include_router(crop_router)
app.include_router(yield_router)
app.include_router(fertilizer_router)
app.include_router(soil_router)
app.include_router(scheme_router)
app.include_router(insurance_router)
app.include_router(expense_router)
app.include_router(prediction_router)
app.include_router(dashboard_router)
app.include_router(profile_router)
# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home endpoint
@app.get("/")
def home():
    return {
        "status": "success",
        "message": "AgriAssist Backend Running Successfully"
    }

