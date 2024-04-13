import re
from gensim.models.keyedvectors import KeyedVectors
from logging import Logger


def is_valid_word(word):
    return bool(re.match(r'^[a-zA-Z\-]+$', word))


# Completely invalidate words
def validate(similarWord, targetWord, knownWords, logger: Logger) -> bool:
    if not is_valid_word(similarWord):
        logger.info("[Validation] " + similarWord + " is not a valid word!")
        return False
    if similarWord in knownWords:
        logger.info("[Validation] " + similarWord + " is already a known word!")
        return False
    if targetWord in similarWord:
        logger.info("[Validation] " + similarWord + " is the target!")
        return False
    else:
        return True

def get_words_from_associations(associations) -> list[str]:
    words_only = []
    for association in associations:
        words_only.append(association[0])
    return words_only

confidence_threshold_for_expansion = .5
second_degree_confidence_threshold = .7
num_words_to_expand_to = 5

# Target word is park
# I have a similar word, walk
# I want to take walk and expand it
def expandWord(base_similar_word, base_similar_word_confidence, word2vec: KeyedVectors, logger: Logger) -> list[str]:
    results = set()
    results.add(base_similar_word)
    if base_similar_word_confidence < confidence_threshold_for_expansion:
        logger.info("[Word Expansion] Not expanding " + base_similar_word + " due to confidence level.")
        return list(results)
    child_similar_word_associations = word2vec.most_similar(base_similar_word, topn=num_words_to_expand_to)
    created_word_candidates = str(child_similar_word_associations)
    logger.info("[Word Expansion] From " + base_similar_word + " discovered: " + str(created_word_candidates))
    for child_similar_word_association in child_similar_word_associations:
        child_similar_word = child_similar_word_association[0].lower()
        child_similar_word_confidence = child_similar_word_association[1]
        if child_similar_word_confidence < second_degree_confidence_threshold:
            logger.info("[Word Expansion] Child similar word " + child_similar_word + " discarded due to low confidence.")
            continue
        logger.info("[Word Expansion] Derived " + child_similar_word + " from " + base_similar_word)
        results.add(child_similar_word)
    return list(results)


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


def formatResults(target_word: str, initial_associations, word2vec: KeyedVectors, logger: Logger):
    all_base_words = get_words_from_associations(initial_associations)
    logger.info("Staring with " + str(all_base_words))
    final_result = [[target_word, 0]]
    known_words = set()
    count = 1
    # Goes in order of similarity
    for initial_association in initial_associations:
        base_similar_word = initial_association[0].lower()
        base_similar_word_confidence = initial_association[1]
        logger.info("Considering " + base_similar_word)
        # Skip words that are the same, probably should skip plural too (?)
        if validate(base_similar_word, target_word, known_words, logger):
            # Expand the current word into more words
            for expandedWord in expandWord(base_similar_word, base_similar_word_confidence, word2vec, logger):
                # Now go through every word, clean and validate again, then add to final results
                cleaned_word = clean(expandedWord)
                if validate(expandedWord, target_word, known_words, logger):
                    final_result.append([cleaned_word, count])
                    known_words.add(expandedWord)
                    count += 1
    return sort(final_result)


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
