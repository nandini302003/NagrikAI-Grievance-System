export const analyzeComplaint = async (text) => {
  // Simulate network delay for realistic AI processing animation
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const lowerText = text.toLowerCase();
  
  let language = "English";
  if (lowerText.includes("hai") || lowerText.includes("nahi") || lowerText.includes("karein")) {
    language = "Hinglish";
  } else if (lowerText.includes("mein") || lowerText.includes("aur") || lowerText.includes("bhi")) {
    language = "Hindi";
  }

  let category = "Municipal Services";
  let department = "Municipal Corporation";
  let priority = "Medium";
  let aiInsight = "General citizen grievance requiring administrative review.";

  // Keyword-based simulated AI classification
  if (lowerText.includes("pani") || lowerText.includes("water")) {
    category = "Water Supply";
    department = "Water Department";
    priority = "High";
    aiInsight = "Complaint indicates prolonged water unavailability affecting residents.";
  } else if (lowerText.includes("road") || lowerText.includes("rasta") || lowerText.includes("pothole")) {
    category = "Roads";
    department = "Road Department";
    priority = "High";
    aiInsight = "Road infrastructure degradation posing risk to commuters.";
  } else if (lowerText.includes("light") || lowerText.includes("electricity") || lowerText.includes("bijli")) {
    category = "Electricity";
    department = "Electrical Department";
    priority = "Medium";
    aiInsight = "Power or street lighting issue requiring maintenance.";
  } else if (lowerText.includes("hospital") || lowerText.includes("doctor") || lowerText.includes("health")) {
    category = "Healthcare";
    department = "Health Department";
    priority = "Critical";
    aiInsight = "Critical healthcare facility issue affecting public wellbeing.";
  } else if (lowerText.includes("garbage") || lowerText.includes("kachra") || lowerText.includes("safai")) {
    category = "Sanitation";
    department = "Sanitation Department";
    priority = "Medium";
    aiInsight = "Waste management and public hygiene concern.";
  } else if (lowerText.includes("police") || lowerText.includes("unsafe") || lowerText.includes("chori")) {
    category = "Public Safety";
    department = "Police Department";
    priority = "Critical";
    aiInsight = "Citizen safety and security concern requiring immediate attention.";
  }

  // Randomize confidence score between 85% and 98%
  const confidence = (Math.random() * (98 - 85) + 85).toFixed(1);

  return {
    language,
    category,
    priority,
    department,
    confidence: parseFloat(confidence),
    aiInsight
  };
};
