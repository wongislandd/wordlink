# Important libraries

import os
from dotenv import load_dotenv

# Load secret .env file
load_dotenv()

from openai import OpenAI

# Hide this api key
client = OpenAI(api_key=os.getenv('OPEN_AI_KEY'))

def generate_hints(word):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system",
             "content": "You are a helpful assistant designed to output a JSON list of riddles for a given word."},
            {"role": "user", "content": "Generate 5 riddles of medium difficulty for the word " + word}
        ]
    )
    return response
