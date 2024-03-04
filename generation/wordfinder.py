# Important libraries

import os
import json
import re

from dotenv import load_dotenv

# Load secret .env file
load_dotenv()

from openai import OpenAI

# Hide this api key
client = OpenAI(api_key=os.getenv('OPEN_AI_KEY'))

def generate_target_words(numWords):
    alreadyGeneratedWords = str(identifyAlreadyGeneratedGames())
    print("Avoiding existing words:" + alreadyGeneratedWords)
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system",
             "content": "You support a game where the user has to deduce a target word through guessing other words and "
                        "finding associations with the target. You generate the target word candidates in JSON form under"
                        "the candidates field. I only need the word itself, candidates should just be a list of words."
                        "The word should be anything that most people would know. It doesn't have to be related to the"
                        "mystery theme of the game at all. The only specific words that I don't want are those which have"
                        "already been generated. This includes " + alreadyGeneratedWords},
            {"role": "user", "content": "Generate " + str(numWords) + " target word candidates for the game"}
        ]
    )
    try:
        # This can potentially lead to duplicates, we'll solve it later
        content = response.choices[0].message.content
        jsonForm = json.loads(content)
        return jsonForm['candidates']
    except:
        return []

def identifyAlreadyGeneratedGames():
    filenames = os.listdir("../server/src/main/resources/games")
    words = []
    for filename in filenames:
        # Use regular expression to extract word part from the filename
        match = re.search(r'\d+-(\w+)', filename)
        if match:
            word = match.group(1)
            words.append(word)
    return words

if __name__ == '__main__':
    print(generate_target_words())