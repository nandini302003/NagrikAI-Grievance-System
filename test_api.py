import requests

URL = "http://127.0.0.1:8000/predict"

# Test Case 1: Valid Complaint
valid_payload = {
    "complaint_text": "Street lights are not working in my area since 3 days.",
    "language": "English"
}

print("--- Testing Valid Input ---")
response = requests.post(URL, json=valid_payload)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.json()}\n")

# Test Case 2: Empty Complaint (Error Handling)
empty_payload = {
    "complaint_text": "   ",
    "language": "English"
}

print("--- Testing Empty Input ---")
response = requests.post(URL, json=empty_payload)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.json()}\n")