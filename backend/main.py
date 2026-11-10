from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes import complaint

app = FastAPI(
    title="Multilingual Public Grievance Routing System",
    description="AI-powered complaint classification and routing",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error", "detail": str(exc)}
    )

# Include Routes
app.include_router(complaint.router)

@app.get("/")
def home():
    return {
        "message": "Grievance Routing API is running!",
        "status": "Success"
    }