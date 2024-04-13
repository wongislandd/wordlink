import re
import nltk
import sys
import logging
from IPython.display import display
from logging import StreamHandler
from nltk.corpus import wordnet as wn

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Create a StreamHandler to redirect logging output to Jupyter Notebook
handler = StreamHandler(sys.stdout)
handler.setLevel(logging.INFO)

# Attach the StreamHandler to the logger
logger = logging.getLogger()
logger.addHandler(handler)

# Optionally, you can remove any existing handlers to avoid duplicate logs
logger.handlers = [handler]


# nltk.download('wordnet')

def is_valid_word(word):
    return bool(re.match(r'^[a-zA-Z\-]+$', word))

# Completely invalidate words
def validate(similarWord, targetWord, knownWords) -> bool:
    if not is_valid_word(similarWord):
        logging.info(similarWord + " is not a valid word!")
        return False
    if similarWord in knownWords:
        logging.info(similarWord + " is not a valid word!")
        return False
    if targetWord in similarWord:
        logging.info(similarWord + " is not a valid word!")
        return False
    else:
        return True

# Use synsets to get more words from each match (this kinda inflates our numbers)
#DEPRECATED
def expandWord(originalWord):
    print("ORIGINAL WORD IS " +originalWord + " --------------------------------------")
    results = set()
    results.add(originalWord)
    synsets = wn.synsets(originalWord, pos="n")
    if len(synsets) == 0:
        return results
    for synset in synsets:
        print("Adding " + synset.lemmas()[0].name() + " to consideration.")
        results.add(synset.lemmas()[0].name())
    return results

def expandWordWithModel(wordToExpand, model):
    numExtraWords = 2
    logging.info("Trying to expand " + wordToExpand)
    similarityResults = model.most_similar(wordToExpand, numExtraWords)
    newWords = []
    for similarResult in similarityResults:
        word = similarResult[0].lower()
        logging.info("Expanded " + str(wordToExpand) + " is similar to " + word)
        if word != wordToExpand:
            newWords.append(word)
    return newWords

def test():
    logging.info("THIS IS AN INFO MESSAGE")

# Enforce conventions (e.g no spaces, underscores, etc.)
def clean(word) -> str:
    # For now, if the word has multiple words, take the first one. "crown_prince" -> "prince"
    return nounify(word).split("_")[0].lower()

def nounify(word) -> str:
    return word

# Sort the games alphabetically to optimize searching, each word should have the proper index
def sort(wordAndScores):
    # Since we're sorting, should I still include the target word?
    # Sorting is good for finding the score of any provided string, but not for identifying the target
    wordAndScores.sort()
    return wordAndScores


def formatResults(targetWord, similarities, model):
    logging.info("STARTING FORMAT RESULTS")
    result = [[targetWord, 0]]
    knownWords = set()
    count = 1
    # Goes in order of similarity
    logging.info("Similar words " + str(similarities))
    for similarity in similarities:
        similarWord = similarity[0].lower()
        # Skip words that are the same, probably should skip plural too (?)
        if validate(similarWord, targetWord, knownWords):
            for expandedWord in expandWordWithModel(similarWord, model):
                cleanedWord = clean(expandedWord)
                if validate(expandedWord, targetWord, knownWords):
                    logging.info("Absorbing " + expandedWord)
                    result.append([cleanedWord, count])
                    knownWords.add(expandedWord)
                    count += 1
    return sort(result)


testWord = "king"
testInput = [('kings', 0.7138045430183411),
             ('queen', 0.6510956883430481),
             ('monarch', 0.6413194537162781),
             ('crown_prince', 0.6204220056533813),
             ('prince', 0.6159993410110474),
             ('sultan', 0.5864824056625366),
             ('ruler', 0.5797567367553711),
             ('running', 0.5646552443504333),
             ('throne', 0.5422105193138123),
             ('#/#-inch', 0.5239794254302979)]


if __name__ == '__main__':
    print(formatResults(testWord, testInput))
