# 🌾 AgriAssist -- AI-Powered Smart Agriculture Decision Support System

AgriAssist is a smart agriculture decision-support platform that helps
farmers make informed farming decisions using machine learning,
rule-based recommendations, live weather information, farmer-support
services, and financial management tools.

## 📌 Project Overview

AgriAssist combines crop recommendation, yield prediction, soil health
analysis, fertilizer recommendation, government schemes, crop insurance,
expense tracking, prediction history, farmer profile management, and a
unified dashboard in one platform.

### Main Goals

-   Recommend suitable crops based on soil and environmental conditions.
-   Predict expected agricultural yield.
-   Analyze soil nutrient status using rule-based standards.
-   Recommend suitable fertilizers based on crop requirements and soil
    deficiencies.
-   Provide agricultural government scheme information.
-   Provide crop insurance information.
-   Track farming expenses and financial summaries.
-   Store and display previous predictions.
-   Provide a centralized farmer dashboard.
-   Use live weather information.
-   Allow farmers to manage and update their profile.

## ✨ Features

### 1. 🌱 Crop Recommendation

Uses a trained **Random Forest Classifier** with:

-   Nitrogen (N)
-   Phosphorus (P)
-   Potassium (K)
-   Temperature
-   Humidity
-   Soil pH
-   Rainfall

Prediction results are stored in the database and displayed in
Prediction History.

### 2. 📈 Yield Prediction

Uses a trained **Random Forest Regressor** with:

-   Crop
-   Year
-   Season
-   State
-   Area
-   Production
-   Fertilizer
-   Pesticide

The predicted yield is displayed in T/Ha and stored for future
reference.

### 3. 🧪 Soil Health Analysis

A rule-based module that evaluates:

-   Nitrogen
-   Phosphorus
-   Potassium

Each nutrient is classified as **Low, Medium, or High** according to the
configured project soil interpretation ranges.

### 4. 🌾 Fertilizer Recommendation

The fertilizer module is **rule-based**, not a trained ML model.

It:

1.  Checks crop nutrient requirements.
2.  Compares them with soil test values.
3.  Identifies nutrient deficiencies.
4.  Selects a suitable fertilizer.
5.  Calculates dosage.
6.  Provides application timing and method.
7.  Displays benefits and precautions.

Supported fertilizer information includes DAP, Urea, MOP, SSP, MAP, and
other configured fertilizers.

### 5. ☁️ Live Weather

Uses the weather service to provide live:

-   Temperature
-   Humidity

Live temperature and humidity can be used in the crop recommendation
workflow.

### 6. 🏛️ Government Schemes

Farmers can search for agricultural schemes based on state.

The module provides:

-   Scheme name
-   Level
-   State
-   Category
-   Description
-   Benefits
-   Eligibility
-   Application process
-   Official URL
-   Verification information

### 7. 🛡️ Crop Insurance

Provides crop insurance information based on:

-   State
-   Crop

The module displays coverage, premium, eligibility, benefits,
application process, and official URLs.

### 8. 💰 Expense Tracker

Farmers can:

-   Add expenses
-   Edit expenses
-   Delete expenses
-   Categorize expenses
-   View total expenses
-   Enter expected revenue
-   View estimated profit/loss
-   View financial recommendations

### 9. 📚 Prediction History

Stores all supported prediction results for the authenticated farmer:

-   Crop Recommendation
-   Yield Prediction
-   Fertilizer Recommendation

Farmers can view results, dates, and delete individual prediction
records.

### 10. 📊 Farmer Dashboard

The dashboard dynamically displays:

-   Current weather
-   Latest crop recommendation
-   Latest predicted yield
-   Latest fertilizer recommendation
-   Recent predictions
-   Dynamic farming insights

New farmers see **"No prediction yet"** instead of fake/default
prediction values.

### 11. ⚙️ Farmer Profile / Settings

Farmers can view and update:

-   Full Name
-   Phone Number
-   State
-   District
-   Preferred Language

The registered email is displayed but cannot be changed from Settings.

## 🏗️ System Architecture

``` text
                    ┌─────────────────────────┐
                    │       AgriAssist        │
                    │ Farmer Web Application  │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   React Frontend        │
                    │   Vite + Tailwind CSS   │
                    └────────────┬────────────┘
                                 │
                         REST API / JWT
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   FastAPI Backend       │
                    └────────────┬────────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ▼                   ▼                   ▼
      ┌─────────────┐     ┌─────────────┐    ┌─────────────┐
      │ ML Models   │     │ Rule-Based  │    │ External /  │
      │             │     │ Services    │    │ Support Data│
      ├─────────────┤     ├─────────────┤    ├─────────────┤
      │ Crop RF     │     │ Soil Health │    │ Weather     │
      │ Yield RF    │     │ Fertilizer  │    │ Schemes     │
      │ Regressor   │     │ Advisories  │    │ Insurance   │
      └─────────────┘     └─────────────┘    └─────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      PostgreSQL         │
                    │ Users + Predictions     │
                    └─────────────────────────┘
```

## 🛠️ Technology Stack

### Frontend

-   React.js
-   Vite
-   Tailwind CSS
-   React Router DOM
-   Axios
-   React Hook Form
-   Framer Motion
-   Lucide React
-   React Hot Toast
-   Recharts

### Backend

-   Python
-   FastAPI
-   Uvicorn
-   SQLAlchemy
-   PostgreSQL
-   Pydantic
-   JWT Authentication
-   Passlib / bcrypt
-   python-jose
-   python-dotenv

### Machine Learning

-   Python
-   Scikit-learn
-   Random Forest Classifier
-   Random Forest Regressor
-   Pandas
-   NumPy
-   Joblib

### External Service

-   OpenWeatherMap

### Development Tools

-   VS Code
-   Git
-   GitHub
-   Postman
-   Swagger / OpenAPI
-   pgAdmin
-   Jupyter Notebook
-   Anaconda

## 📁 Project Structure

``` text
SMART_AGRICULTURE/
│
├── backend/
│   ├── datasets/
│   ├── ml/
│   │   └── prediction/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── database.py
│   ├── app.py
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔐 Authentication

AgriAssist uses JWT-based authentication.

``` text
Register
   ↓
Login
   ↓
JWT Token
   ↓
Authenticated API Requests
   ↓
Protected Dashboard
```

Prediction history and profile operations are associated with the
authenticated farmer.

## 🗄️ Database

PostgreSQL is used for persistent application data.

### Users Table

``` text
users
├── id
├── full_name
├── email
├── phone
├── password
├── state
├── district
├── preferred_language
├── role
└── created_at
```

### Predictions Table

``` text
predictions
├── id
├── farmer_id
├── prediction_type
├── input_data
├── result
└── created_at
```

Each prediction is linked to its farmer through `farmer_id`.

## 🚀 Installation and Setup

### Prerequisites

-   Python 3.10+
-   Node.js
-   npm
-   PostgreSQL
-   Git

### 1. Clone the Repository

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd SMART_AGRICULTURE
```

### 2. Backend Setup

``` bash
cd backend
python -m venv venv
```

Windows:

``` bash
venv\Scriptsctivate
```

Install dependencies:

``` bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create `backend/.env`:

``` env
DATABASE_URL=postgresql://username:password@localhost:5432/agriassist
SECRET_KEY=your_secret_key
OPENWEATHER_API_KEY=your_openweather_api_key
```

Do not commit `.env` or API keys to GitHub.

### 4. Start Backend

``` bash
uvicorn app:app --reload
```

Backend:

``` text
http://127.0.0.1:8000
```

Swagger:

``` text
http://127.0.0.1:8000/docs
```

### 5. Start Frontend

``` bash
cd frontend
npm install
npm run dev
```

Frontend:

``` text
http://localhost:5173
```

## 🔗 Main API Modules

  Module                      Endpoint
  --------------------------- -------------------------
  Crop Recommendation         `/crop/predict`
  Yield Prediction            `/yield/predict`
  Yield Options               `/yield/options`
  Fertilizer Recommendation   `/fertilizer/recommend`
  Soil Health                 `/soil`
  Government Schemes          `/schemes`
  Crop Insurance              `/insurance`
  Expenses                    `/expenses`
  Expense Summary             `/expenses/summary`
  Prediction History          `/predictions`
  Dashboard                   `/dashboard`
  Farmer Profile              `/profile`
  Weather                     `/weather`

## 🔄 Prediction Flow

### Crop Recommendation

``` text
Farmer Input
     ↓
N, P, K, Temperature, Humidity, pH, Rainfall
     ↓
Random Forest Classifier
     ↓
Recommended Crop
     ↓
PostgreSQL
     ↓
Dashboard + Prediction History
```

### Yield Prediction

``` text
Farmer Input
     ↓
Crop + Year + Season + State
+ Area + Production + Fertilizer + Pesticide
     ↓
Random Forest Regressor
     ↓
Predicted Yield
     ↓
PostgreSQL
     ↓
Dashboard + Prediction History
```

### Fertilizer Recommendation

``` text
Crop Requirements
        +
Soil Test Values
        ↓
Nutrient Deficiency Analysis
        ↓
Fertilizer Selection
        ↓
Dosage + Timing + Method
        ↓
Dashboard + Prediction History
```

## 🔒 Security

-   JWT authentication protects user-specific API operations.
-   Passwords are hashed before storage.
-   Prediction records are filtered using the authenticated farmer ID.
-   Farmer profile operations use the authenticated user's identity.
-   Database credentials and API keys are stored in environment
    variables.
-   Sensitive configuration files should not be committed to GitHub.

## 🧪 Testing

Backend APIs can be tested using:

-   Swagger UI
-   Postman

Important frontend flows to test:

-   Registration
-   Login
-   Logout
-   Dashboard
-   Crop prediction
-   Yield prediction
-   Soil health
-   Fertilizer recommendation
-   Government schemes
-   Crop insurance
-   Expense tracking
-   Prediction history
-   Farmer profile update

## 🌱 Future Enhancements

-   Additional regional language support
-   More crop and fertilizer datasets
-   Advanced farmer analytics
-   Mobile application
-   Additional ML models
-   More personalized recommendations
-   Automated report generation
-   Cloud deployment
-   Additional agricultural data integrations

## 👩‍💻 Contributors

**AgriAssist Project Team**

Developed as an academic project for a smart agriculture
decision-support system.

## 📄 License

This project is developed for academic and educational purposes.

------------------------------------------------------------------------

## 🌾 AgriAssist

**Smart Agriculture Decision Support System**

> Helping farmers make informed decisions through technology, data, and
> intelligent recommendations.
