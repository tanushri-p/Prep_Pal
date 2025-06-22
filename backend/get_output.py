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
from functools import lru_cache
import hashlib

load_dotenv()

response_cache = {}

app = FastAPI(
    title="Meal Plan Generator API",
    description="Generate meal plans and grocery lists using Gemini AI",
    version="1.0.0"
)

# declare origin/s
origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost:8080",  # Add this line
    "localhost:8080"          # Add this line too
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
async def generate_meal_plan_simple(request: MealPlanRequest):
    """
    Endpoint that takes a MealPlanRequest with prompt in the request body.
    """
    prompt = request.prompt
    prompt += " Based on the user information, please generate a 7-day meal plan. Try to give meals that I can meal prep for with limited ingredients. also give me a corresponding grocery list with estimated prices based on average U.S. prices."
    
    # Create cache key from prompt
    cache_key = hashlib.md5(prompt.encode()).hexdigest()

    # Check cache first
    if cache_key in response_cache:
        return response_cache[cache_key]
    
    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "response_schema": MealPlanAndGroceryResponse.model_json_schema(),
                "temperature": 0.7,  # Lower temperature for faster, more consistent responses
                "max_output_tokens": 2048,  # Limit output size
                "top_p": 0.8,  # Optimize sampling
            },
        )
        
        result = {"response": json.loads(response.text)}
        
        # Cache the response
        response_cache[cache_key] = result
        
        return result
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating meal plan: {str(e)}"
        )
    
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "meal-plan-generator"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
