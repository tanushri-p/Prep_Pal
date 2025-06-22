# PrepPal

## Inspiration

As busy college students who have recently started living on our own, we've realized that deciding what to meal prep or cook everyday is more difficult than it seems. This challenge is further exacerbated for students/working professionals with significant dietary restrictions. Individuals with medical conditions such as celiac disease, IBS, gastrointestinal disorders, diabetes, or severe allergies often have trouble finding delicious yet suitable meals for their specific dietary needs. We created PrepPal to help all of these people spend less time and energy searching the internet for recipes that work for them and instead enjoy their personalized meals!
 
## What it does

PrepPal is an AI-powered tool that helps you plan personalized meals for the week and generate a corresponding grocery list so you can buy your ingredients in one go. Simply enter any dietary restrictions/preferences you have, select your budget constraints and prep time constraints, and enter any existing ingredients you would like to incorporate in your meals. PrepPal will take into account all your preferences and give you breakfast, lunch, and dinner for all seven days of the week with details on necessary prep time and how to make it. Then, depending on your generated meals, PrepPal will also give you a grocery list separated by category (i.e. produce, protein) that you can check off as you gather the ingredients.

## How we built it

- Frontend: We used Lovable, a platform that uses AI to generate a working frontend. This used TypeScript, Tailwind CSS, and React.
- Integration: We extracted the information from the form submission in the frontend, and used TypeScript to make an API call to our backend.
- Backend: From the API call to our backend, we set up another API call to Gemini API and received the meal plan and grocery list Gemini generated in JSON format.

## Challenges we ran into
- We weren't familiar with TypeScript, so integrating our frontend with our backend logic took lots of trial and error.
- We initially intended for PrepPal to utilize Vapi and to be a voice-based assistant, however we ran into trouble with retrieving the specific call data using the Vapi API. Therefore, we had to pivot to using a form-based input.

## Accomplishments that we're proud of
- We successfully integrated our frontend with our backend logic that prompted Gemini API.
- Even though we had to pivot our initial plans a bit, we still persevered and put together a working final product.

## What we learned
- We all learned how to work with React for the first time.
- We also figured out how to work with Gemini API and efficient prompt engineering strategies.
- Lastly, we explored using Vapi and created our own voice assistant for PrepPal, although it didn't make the final product.

## What's next for PrepPal
Implementing additional features such as retrying to implement a voice assistant using Vapi, including an estimated cost for each grocery item based on location, and including AI-generated images of each meal for user reference.
