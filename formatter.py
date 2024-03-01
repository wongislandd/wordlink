# Completely invalidate words
def validate(targetWord, similarWord) -> bool:
    if targetWord in similarWord:
        return False
    else:
        return True


# Enforce conventions (e.g no spaces, underscores, etc.)
def clean(word) -> str:
    # For now, if the word has multiple words, take the first one. "crown_prince" -> "prince"
    return word.split("_")[0]


# Sort the results alphabetically to optimize searching, each word should have the proper index
def sort(wordAndScores):
    # Since we're sorting, should I still include the target word?
    # Sorting is good for finding the score of any provided string, but not for identifying the target
    wordAndScores.sort()
    return wordAndScores


def formatResults(targetWord, similarities):
    result = [[targetWord, 0]]
    count = 1
    for similarity in similarities:
        similarWord = similarity[0]
        if validate(targetWord, similarWord):
            result.append([clean(similarWord), count])
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
             ('princes', 0.5646552443504333),
             ('throne', 0.5422105193138123),
             ('royal', 0.5239794254302979)]

import sys

if __name__ == '__main__':
    print(formatResults(testWord, testInput))
