// backend ka URL
const BASE_URL = "http://127.0.0.1:8000";

// Complaint submit karne ke liye (Puraana code)
export const submitComplaint = async (complaintData) => {
  try {
    const response = await fetch(`${BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complaint_text: complaintData.complaint, language: "English" }),
    });
    if (!response.ok) throw new Error("Failed to submit complaint");
    const result = await response.json();
    return {
      id: `GRV-${Math.floor(100000 + Math.random() * 900000)}`,
      complaint: result.complaint_text,
      category: result.predicted_category,
      priority: result.priority,
      department: result.assigned_department,
      language: result.language || "English",
      status: "Pending",
      submittedAt: result.created_at || new Date().toISOString(),
      confidence: 95,
      aiInsight: `Your complaint has been routed to the ${result.assigned_department} based on its category.`
    };
  } catch (error) { throw error; }
};

// NAYA: Admin Dashboard ke liye real data fetch karna
export const getAdminAnalytics = async () => {
  try {
    const response = await fetch(`${BASE_URL}/complaints`);
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();

    // Stats calculate karna
    const totalComplaints = data.length;
    const pending = data.filter(c => c.status === "Pending").length;
    const resolved = data.filter(c => c.status === "Resolved").length;

    // Priority data nikalna (Chart ke liye)
    const priorityCounts = { URGENT: 0, NORMAL: 0, ROUTINE: 0 };
    const categoryCounts = {};
    
    data.forEach(c => {
      if (priorityCounts[c.priority] !== undefined) priorityCounts[c.priority]++;
      if (c.predicted_category) {
        categoryCounts[c.predicted_category] = (categoryCounts[c.predicted_category] || 0) + 1;
      }
    });

    const priorityData = [
      { name: 'Critical', value: priorityCounts['URGENT'] || 0, fill: '#ef4444' },
      { name: 'High', value: priorityCounts['NORMAL'] || 0, fill: '#f97316' }, 
      { name: 'Medium', value: priorityCounts['ROUTINE'] || 0, fill: '#eab308' },
    ];

    // Map to chart format (Dummy months, real total)
    const complaintsData = [
      { name: 'Current', total: totalComplaints, resolved: resolved }
    ];

    return {
      totalComplaints,
      pending,
      resolved,
      avgResolutionTime: 2, // Dummy
      aiAccuracy: 94.2, // Dummy
      priorityData,
      complaintsData
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Baaki dummy functions
export const predictComplaint = async () => { return {}; };
export const trackComplaint = async () => { return {}; };
export const getCitizenComplaints = async () => { return []; };
export const getOfficerComplaints = async () => { return []; };
export const updateComplaintStatus = async () => { return {}; };

// Track Complaint API Call
export const trackComplaintById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/complaints/track/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Complaint not found");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};