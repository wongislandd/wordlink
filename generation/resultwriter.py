import os
import json

def convertFormattedResultsToJson(results):
    print(results)
    ret = []
    for result in results:
        jsonFormat = {
            'word': result[0],
            'score': result[1]
        }
        ret.append(jsonFormat)
    return ret

def write_results(targetWord, hints, formattedResults, is_test = False, variant_tag = ""):
    pathToGames = "../server/src/main/resources/games/"
    currentCount = len(os.listdir(pathToGames))
    finalPath = pathToGames + str(currentCount) + "-" + targetWord + ".json"

    if is_test:
        # Write the results to a file
        pathToGames = "./test/"
        finalPath = pathToGames + targetWord + "-" + variant_tag + ".json"

    # Make this unique with a number

    # Convert to dict for writing
    associationsDict = {
        "hints": hints,
        "associations": convertFormattedResultsToJson(formattedResults)
    }

    json_object = json.dumps(associationsDict, indent=4)

    with(open(finalPath, 'w+')) as f:
        f.write(json_object)

    print("Writing to file", finalPath, "with", len(formattedResults), "associations")