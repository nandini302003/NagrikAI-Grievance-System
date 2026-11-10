from pathlib import Path
import joblib

# Project paths
BASE_DIR = Path(__file__).resolve().parent.parent.parent
MODEL_DIR = BASE_DIR / "models"

# Load models
category_model = joblib.load(MODEL_DIR / "category_classification_model.pkl")
severity_model = joblib.load(MODEL_DIR / "severity_classification_model.pkl")

print("Category model loaded successfully!")
print("Severity model loaded successfully!")

# Department & Priority mappings
department_mapping = {
    "Road & Transportation": "Public Works Department",
    "Waste Management": "Sanitation Department",
    "Electricity": "Electricity Department",
    "Health & Sanitation": "Health Department",
    "Water Leakage": "Water Supply Department",
    "Public Safety": "Public Safety / Emergency Services",
    "Encroachment & Illegal Construction": "Municipal Enforcement Department",
    "Others": "General Municipal Department"
}

priority_mapping = {
    "HIGH": "URGENT",
    "MEDIUM": "NORMAL",
    "LOW": "ROUTINE"
}