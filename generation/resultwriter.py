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

def write_results(targetWord, hints, formattedResults):
    # Write the results to a file
    pathToGames = "../server/src/main/resources/games/"

    # Make this unique with a number
    currentCount = len(os.listdir(pathToGames))
    finalPath = pathToGames + str(currentCount) + "-" + targetWord + ".txt"

    # Convert to dict for writing
    associationsDict = {
        "hints": hints,
        "associations": convertFormattedResultsToJson(formattedResults)
    }

    json_object = json.dumps(associationsDict, indent=0)

    with(open(finalPath, 'w+')) as f:
        f.write(json_object)

    print("Writing to file", finalPath, "with", len(formattedResults), "associations")