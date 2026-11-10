# 🏛️ NagrikAI - Multilingual Public Grievance Routing System

NagrikAI is an AI-powered public grievance management system designed to bridge the gap between citizens and government departments. It uses Machine Learning (NLP) to automatically understand complaints, classify their category, determine their priority, and route them to the correct municipal department.

## 🚀 Features

- **AI-Powered Classification:** Automatically predicts the Category (e.g., Water, Roads, Electricity) and Severity (Urgent, Normal, Routine) of a complaint.
- **Smart Routing:** Automatically assigns the complaint to the correct department based on the predicted category.
- **Role-Based Dashboards:**
  - **Citizen:** Submit complaints and track their status using a Short Tracking ID.
  - **Officer:** View only their department's complaints, update statuses (Pending, In Progress, Resolved), and add official responses.
  - **Admin:** View system-wide analytics, department distributions, and all complaints.
- **Modern UI:** Responsive and clean user interface built with React and Tailwind CSS.
- **Database Integration:** Real-time data storage using MongoDB.

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, Lucide Icons, Recharts
- **Backend:** FastAPI (Python), Uvicorn
- **Machine Learning:** Scikit-Learn, Joblib (Classification Models)
- **Database:** MongoDB (using Motor Async Driver)

## 📂 Project Structure

```text
Grievance-project/
│
├── backend/                  # FastAPI Backend
│   ├── app/
│   │   ├── main.py           # Main entry point
│   │   ├── database.py       # MongoDB connection
│   │   ├── models.py         # Pydantic request models
│   │   ├── ml_model.py       # AI model loading & mappings
│   │   └── routes/
│   │       └── complaint.py  # All API endpoints
│   │
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── pages/            # All UI pages (Admin, Officer, Citizen, Auth)
│   │   ├── components/       # Reusable UI components
│   │   └── services/         # API call functions (api.js)
│   ├── package.json
│   └── vite.config.js
│
├── models/                   # Trained .pkl ML models
├── dataset/                  # Training dataset CSV
└── README.md
---------------------------------------------------------------
⚙️ How to Run the Project Locally
Prerequisites
Make sure you have installed:

Python (3.8+)

Node.js (16+)

MongoDB (Local server running on localhost:27017)
---------------------------------------------------------------
1. Setup Backend (FastAPI)
Open a terminal and navigate to the project root:
 
cd Grievance-project
# Create and activate virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn pandas numpy scikit-learn joblib pydantic motor

# Run the backend server
python -m uvicorn backend.main:app --reload

The backend will run at http://127.0.0.1:8000
------------------------------------------------------------
2. Setup Frontend (React)
Open a new terminal and navigate to the frontend folder:

cd Grievance-project/frontend
# Install dependencies
npm install

# Run the development server
npm run dev
The frontend will run at http://localhost:5173
---------------------------------------------------------

3. Database (MongoDB)
Make sure your MongoDB server is running. The backend will automatically create a database named grievance_db and a collection named complaints.

🔗 API Endpoints Summary
Method	Endpoint	Description
POST	/predict	Submit a new complaint and get AI predictions
GET	/complaints	Fetch all complaints (Admin)
GET	/complaints/department/{department}	Fetch complaints by specific department (Officer)
GET	/complaints/track/{complaint_id}	Track a complaint using full or short ID (Citizen)
PUT	/complaints/{complaint_id}/status	Update complaint status (Officer)
GET	/admin/stats	Get department-wise statistics (Admin)
-----------------------------------------------------------------------------------------------
Author
Nandini (B.Tech CSE - AIML, 5th Semester Project)

Built with ❤️ for Smarter Governance.