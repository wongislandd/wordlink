import os
import json

def write_results(targetWord, hints, formattedResults):
    # Write the results to a file
    pathToGames = "../server/src/main/resources/games/"

    # Make this unique with a number
    currentCount = len(os.listdir(pathToGames))
    finalPath = pathToGames + str(currentCount) + "-" + targetWord + ".txt"

    # Convert to dict for writing
    resultsDict = {
        "hints": hints,
        "results": formattedResults
    }

    json_object = json.dumps(resultsDict, indent=0)

    with(open(finalPath, 'w+')) as f:
        f.write(json_object)

    print("Writing to file", finalPath, "with", len(formattedResults), "associations")