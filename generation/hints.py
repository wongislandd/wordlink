# Important libraries

import os
import json
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
             "content": "You are a helpful assistant designed to output a JSON list of riddles for a given word."
                        "You only provide one field 'riddles' in the response with only the question for the riddle" },
            {"role": "user", "content": "Generate 3 riddles of medium difficulty for the word " + word}
        ]
    )
    try:
        content = response.choices[0].message.content
        jsonForm = json.loads(content)
        return jsonForm['riddles']
    except:
        return []


#print(generate_hints("tomato"))