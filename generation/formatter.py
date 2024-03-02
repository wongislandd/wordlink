import re

import nltk
from nltk.corpus import wordnet as wn

nltk.download('wordnet')

def is_valid_word(word):
    return bool(re.match(r'^[a-zA-Z\-]+$', word))

# Completely invalidate words
def validate(similarWord, targetWord, knownWords) -> bool:
    if not is_valid_word(similarWord):
        return False
    if similarWord in knownWords:
        return False
    if targetWord in similarWord:
        return False
    else:
        return True

# Use synsets to get more words from each match (this kinda inflates our numbers)
def expandWord(originalWord):
    results = set()
    results.add(originalWord)
    synsets = wn.synsets(originalWord, pos="n")
    if len(synsets) == 0:
        return results
    for synset in synsets:
        results.add(synset.lemmas()[0].name())
    return results

# Enforce conventions (e.g no spaces, underscores, etc.)
def clean(word) -> str:
    # For now, if the word has multiple words, take the first one. "crown_prince" -> "prince"
    return nounify(word).split("_")[0]

def nounify(word) -> str:
    return word

# Sort the results alphabetically to optimize searching, each word should have the proper index
def sort(wordAndScores):
    # Since we're sorting, should I still include the target word?
    # Sorting is good for finding the score of any provided string, but not for identifying the target
    wordAndScores.sort()
    return wordAndScores


def formatResults(targetWord, similarities):
    result = [[targetWord, 0]]
    knownWords = set()
    count = 1
    # Goes in order of similarity
    for similarity in similarities:
        similarWord = similarity[0].lower()
        # Skip words that are the same, probably should skip plural too (?)
        if validate(similarWord, targetWord, knownWords):
            for expandedWord in expandWord(similarWord):
                cleanedWord = clean(expandedWord)
                if validate(expandedWord, targetWord, knownWords):
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
