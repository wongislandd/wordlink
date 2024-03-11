# Wordlink
Wordlink is a game built around word associations to a target. Players can guess words and they will be given a score based on the "closeness" of their guess to the answer. The goal is to guess the answer using your previous guesses and associated scores as hints to solve it! You can play here: https://wongislandd.github.io/wordlink/

<img width="1320" alt="image" src="https://github.com/wongislandd/wordlink/assets/46093907/86923fd8-a6d9-45b7-b4fa-76fcb83eac17">

# Technical Details
The repository is broken down into three pillars of this app-- `generation`, `server` and `web-app`. I'll detail each one individually.

## Generation (AI, offline)

### Context
Each word and its associations are pre-generated. This was an intentional decision given the planned scope and scale of this project. The end-goal state is to auto-generate each day or possibly once a week and just store it. Everyday will have a new target word associated with it, and players will be defaulted to a session with that word, but will have the option to go backwards to play previous day's words. By not offering the users a feature to generate new games on the fly, I am able to limit my scope and simply keep a limited record of all available games locally.


### Process
1. I make a request to GPT 3.5-Turbo with a prompt describing the game a bit and then asking for interesting words not including words which I've already generated made games for.
2. I load up a local model using gensim to generate keyed vectors from Google's pretrained word2vec model. You can read more about the model [here](https://code.google.com/archive/p/word2vec/). The TLDR is that it's trained to provide word associations to a given word and trained on Google's vocabulary/indexing, which I trust is good 😁. Small note here, this is done before step 1 so that I have the model in memory, ready to associate against several words.
3. I then ask the model to generate N associations for a candidate word I generated in step 1. I've toyed around with this number. For the purposes of this game, once you generate too many associations the quality can start to fall off quick.
4. I take the associations that were generated and do some validating, inflating, and formatting.
   a. I first validate words to make sure they match my criteria. This is for things like filtering for actual words (T_T is not a word in my eyes, sorry Google). If a word is valid, I'll clean it up, ensuring lower-case, removing extra spaces, etc.
   b. Next I'll perform a process where I inflate the valid word. For each valid word, I'll find more associated words to add to my total associations. I'll run them through the same validations from step A. I only do this to the first degree to avoid getting too far separated from the original word. This process is a bit flawed at the moment, I'd like to add some more logic here (only inflate if confidence level of the original association is > X)
   c. Finally I'll format the final list of words into a format that I can expect to eventually write into a json file. This formatting most notably involves alphabetically sorting the associations, this way I can binary search it later.
5. I use GPT 3.5-Turbo to generate riddles for the target word. This was to support the "give up" feature, where users can get a hint on the actual word. This proves to be almost too useful, I should ensure the riddles are harder 😃!
6. With the word associations formatted, and hints ready to go, I write the results into a json file. This marks the end of the generation process. The file represents a game for the user to play and serves as the handoff to the online part of this project.

## Server (Spring)

### Context
I've made a few Spring Boot servers before. The most distinct aspect of this one is that I have to be able to read in the generated file and parse it into something I can actually work with. This proved difficult when deploying this as a JAR, I'll get to that more later.

I'll break this section down by some key logic and decisions that is going on here.

### Reading the Files
Initially I used [Spring's ResourceLoader](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/io/ResourceLoader.html) to grab identify file names and iterate through a directory. When working with the `File` type, this was simple. As it turns out, this led to issues when deploying the app is a JAR, which is how Github Actions wants to deploy it to Azure! Note to readers and my futureself, in a JAR the file system is a bit different. There aren't directories. Everything is just a resource that stands next to eachother. You can walk through this but my initial organizational plan didn't mesh as well into this. I eventually ended up being able to accomplish the same things with an implementation that was supported by JARs (`InputStream`s are less fun then `File`s). At the end of it, I'm using gson to parse the game files into a `GameFile` type, which I'll be able to work with.

### Scoring Guesses
This is the core of the whole game. Give me a word and tell me what game your playing, I'll give you a score. That's the verbose contract I had in my head before writing this out. Turns out that works pretty well cause a bunch of things are going on behind the scenes here. Let's walk through this process a bit:

1. Given a guess word, I'll first validate it. The user can type anything in here after all. First, I'll check if what you've given me is an actual word. I built a small DictionaryClient around making a call to https://dictionaryapi.dev/. Then a small service around that to abstract the process of "give me a word, I'll tell you if it's a real word". If your word is real, we'll continue. If it's not, I send an identifyable error which I've configured the web-app to shake the input to signal it to the user.
2. The rest of the process is simple. I'll find the `GameFile` associated with your game, and perform binary search (thank you offline generation for setting it up this way!) on the associations for your word. If your guess is there, you'll get the score I have associated on it in the file. If it's not there, I'll give you (totalNumberOfAssociations)+ as the answer.

### Small Optimizations/Decisions
1. Reading and parsing large files can be expensive, and ultimately slow down the user experience. I'm caching the reads of the files into GameFiles. I have a `WeirdCache` which was written by ChatGPT 😉. It stores the 2 latest entries into a list and pushes out the old when new ones come in. If I'm identifying game X's file and it's already in the cache, I'll just take it from there.
2. The abstraction of the gameId to the game file and resulting target word is intentional. I don't want the client to ever know about the answer word until they guess it. Not in the traffic or anything, is that overkill security on a casual game? Maybe. The mapping is only known by the server.

## Web app (React)

### Context
When I was in school, I loved messing with React. It was my first taste of frontend development and it was a portal to the user. I thought I was going to do web-development as a career, but my path led me to Android instead (not complaining, I love Android). I haven't really used React since then, but coming back to it here was a fun and rewarding refresh. This part is straightforward, but I want to point out some things:

1. React Hooks and Context are amazing. It simplifies a lot of the state management that I recall doing with Redux previously. 
2. Working on this solidified my belief that code really is just code when it comes to design patterns. Whatever you bundle it in, build a package or framework around it in, some design principles just work everywhere. I've been working professionally on Android for around 3 years now, and I feel I was able to pick up React Hooks so quickly because it was pretty similar to LiveData in Android, or the consumer/producer pattern anywhere. Same thing goes for making network calls, handling synchronous functionality, etc.
3. ChatGPT is seriously powerful when it comes to casual web-development. I feel like there's just so many resources online about web-dev that ChatGPT can just serve as the ultimate aggregator. Basically all my css-styling was written by ChatGPT, big fan.

## Automated Deployment (CI/CD)
Github actions is seriously cool. It took me a bunch of trial/error but I was able to setup the spring server and react app to deploy themselves on new commits. This was a nice touch that made this feel like the real deal.

## Whole Project Context and Takeaways
I was getting a craving to just try making something. It didn't need to be anything groundbreaking, I just wanted to benchmark my current skills as a developer. I'll probably do something similar again in a few years. Admittedly, I'm taking a massive amount of inspiration from [Contexto](https://contexto.me/). Having this reference allowed me to focus on the technical implementation over product requirements. I held myself to not look into Contexto's implementation. Not that the information is readily available anywhere, but I wanted to figure the system design part of this out myself.

Working professionally on software has really improved my skills over the past few years. Three years ago I worked on [this capstone project](https://github.com/wongislandd/GerrymanderingWebApp) with two other students over the course of a semester (4-ish months). I worked on this project on/off over like 4 days. Although the scope was considerably smaller, I feel if I was tasked with the same capstone project, I could probably knock it out on my own in a week or two. I'm really excited to continue to grow my skills. Thanks for reading through this journal-like README!
