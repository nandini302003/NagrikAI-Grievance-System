from fastapi import APIRouter, HTTPException
from datetime import datetime
from pydantic import BaseModel
from bson.objectid import ObjectId
from ..models import ComplaintRequest
from ..database import complaint_collection
from ..ml_model import category_model, severity_model, department_mapping, priority_mapping

router = APIRouter()

# Model for status update
class StatusUpdate(BaseModel):
    status: str

@router.get("/complaints")
async def get_all_complaints():
    complaints = []
    cursor = complaint_collection.find({})
    async for document in cursor:
        document["_id"] = str(document["_id"])
        complaints.append(document)
    return complaints

@router.post("/predict")
async def predict_complaint(request: ComplaintRequest):
    try:
        complaint = request.complaint_text.strip()

        if not complaint:
            raise HTTPException(status_code=400, detail="Complaint text cannot be empty")

        # Predictions
        predicted_category = category_model.predict([complaint])[0]
        predicted_severity = severity_model.predict([complaint])[0]

        # Assignments
        assigned_department = department_mapping.get(predicted_category, "General Municipal Department")
        priority = priority_mapping.get(predicted_severity, "NORMAL")

        # Save to DB
        result_data = {
            "complaint_text": complaint,
            "language": request.language,
            "predicted_category": str(predicted_category),
            "predicted_severity": str(predicted_severity),
            "assigned_department": assigned_department,
            "priority": priority,
            "status": "Pending", # Changed from "Prediction successful" to "Pending"
            "created_at": datetime.now() 
        }

        await complaint_collection.insert_one(result_data)
        result_data.pop("_id", None) # Remove DB ID from response

        return result_data

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# --- NEW ENDPOINTS FOR OFFICER & ADMIN ---

# 1. Officer Dashboard: Get complaints by specific department
@router.get("/complaints/department/{department_name}")
async def get_complaints_by_department(department_name: str):
    complaints = []
    cursor = complaint_collection.find({"assigned_department": department_name})
    async for document in cursor:
        document["_id"] = str(document["_id"])
        complaints.append(document)
    return complaints

# 2. Admin Dashboard: Get overall stats
@router.get("/admin/stats")
async def get_admin_stats():
    total_complaints = await complaint_collection.count_documents({})
    
    # Group by department to get counts
    pipeline = [
        {"$group": {"_id": "$assigned_department", "count": {"$sum": 1}}}
    ]
    dept_stats_cursor = complaint_collection.aggregate(pipeline)
    dept_stats = {}
    async for doc in dept_stats_cursor:
        dept_stats[doc["_id"]] = doc["count"]

    return {
        "total_complaints": total_complaints,
        "department_stats": dept_stats
    }

# 3. Update Complaint Status (For Officers to mark as Resolved/In Progress)
@router.put("/complaints/{complaint_id}/status")
async def update_complaint_status(complaint_id: str, status_data: StatusUpdate):
    try:
        result = await complaint_collection.update_one(
            {"_id": ObjectId(complaint_id)},
            {"$set": {"status": status_data.status}}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Complaint not found or status unchanged")
        return {"message": "Status updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 4. Track Complaint by ID (Citizen ke liye - Short ID support ke saath)
@router.get("/complaints/track/{complaint_id}")
async def track_complaint(complaint_id: str):
    try:
        complaint = None
        
        # Pehle try karo full ObjectId se (agar 24 chars hain)
        if len(complaint_id) == 24:
            try:
                complaint = await complaint_collection.find_one({"_id": ObjectId(complaint_id)})
            except:
                pass
        
        # Agar nahi mila, toh short ID (last 6 chars) se manually dhundho
        if not complaint:
            # Saari complaints fetch karo
            cursor = complaint_collection.find({})
            async for doc in cursor:
                # ObjectId ko string mein badlo
                doc_id_str = str(doc["_id"])
                # Check karo ki ID ka end (last 6 chars) match kar raha hai ya nahi
                # Case-insensitive match ke liye .lower() use kiya hai
                if doc_id_str[-6:].lower() == complaint_id.lower():
                    complaint = doc
                    break
        
        if not complaint:
            raise HTTPException(status_code=404, detail="Complaint not found. Please check the ID.")
            
        complaint["_id"] = str(complaint["_id"])
        return complaint
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))   