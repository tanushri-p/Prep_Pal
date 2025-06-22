from google import genai
from google.genai import types
import sys
from dotenv import load_dotenv
import os
import json
from fastapi import FastAPI, HTTPException, Request
from typing import Optional
from pydantic import BaseModel
import uvicorn
from schema.output_schema import MealPlanAndGroceryResponse, MealPlan, GroceryList
from fastapi.middleware.cors import CORSMiddleware
import requests
#from vapi import Vapi

#client = Vapi(token=os.getenv('PRIV_VAPI_KEY'), )

load_dotenv()

app = FastAPI(
    title="Meal Plan Generator API",
    description="Generate meal plans and grocery lists using Gemini AI",
    version="1.0.0"
)

# declare origin/s
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

API_KEY = os.getenv('API_KEY')
if not API_KEY:
    print("Error: API_KEY not set in environment.")
    sys.exit(1)

client = genai.Client(api_key=API_KEY)

# Request model
class MealPlanRequest(BaseModel):
    prompt: str

class Id(BaseModel):
    id: str

# Response model
class MealPlanResponse(BaseModel):
    meal_plan: dict
    grocery_list: dict
    raw_response: str

@app.get("/")
async def root():
    return {"message": "Meal Plan Generator API is running!"}

@app.post("/generate-meal-plan-simple")
async def generate_meal_plan_simple(prompt: str):
    """
    Simple endpoint that takes just a prompt string.
    """
    prompt += "Based on the user information, please generate a 7-day meal plan. Try to give meals that I can meal prep for with limited ingredients. also give me a corresponding grocery list with estimated prices based on average U.S. prices."
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "response_schema": MealPlanAndGroceryResponse.model_json_schema(),
            },
        )
        
        return {"response": json.loads(response.text)}
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating meal plan: {str(e)}"
        )

@app.post("/receive_id")
async def receive_id(res : Id):
    callId = res.id #"cac66879-4256-45b1-bf1d-07e26863057a"
    # print(callId)
    url = "https://api.vapi.ai/call/" + callId
    response = requests.get(
        url,
        headers={"Authorization": "Bearer " + os.getenv('PRIV_VAPI_KEY')},
    )
    return response.json()
    
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "meal-plan-generator"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
