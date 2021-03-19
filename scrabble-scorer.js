// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   return input.question('Enter a word to score: ');
};

const simpleScore = word =>
  word
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .length;

const vowelBonusScore = word =>
  word
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('')
    .reduce((score, letter) => score + (letter.match(/[eyuioa]/) ? 3 : 1), 0);

const scrabbleScore = word =>
  word
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('')
    .reduce((score, letter) => score + newPointStructure[letter], 0);

const scoringAlgorithms = [
  {
    name: 'Simple Scorer',
    description: 'Each letter is worth 1 point.',
    scoringFunction: simpleScore,
  },
  {
    name: 'Bonus Vowels	',
    description: 'A function that returns a score based on the number of vowels and consonants.',
    scoringFunction: vowelBonusScore,
  },
  {
    name: 'Scrabble',
    description: 'The traditional scoring algorithm.',
    scoringFunction: scrabbleScore,
  },
];

const enforceInput = (questionString, acceptableValues) => {
  let userInput;

  do {
    userInput = input.question(questionString);
  } while(!acceptableValues.includes(userInput));

  return userInput;
};

function scorerPrompt(word) {
  console.log('Which scoring algorithm would you like to use?\n');
  console.log('0 - Simple: One point per character');
  console.log('1 - Vowel Bonus: Vowels are worth 3 points');
  console.log('2 - Scrabble: Uses scrabble point system');
  const scorerFunctionIndex = enforceInput('Enter 0, 1, or 2: ', ['0', '1', '2']);
  const { scoringFunction } = scoringAlgorithms[scorerFunctionIndex];
  const score = scoringFunction(word);
  console.log(`Score for '${word}': ${score}`);
};

function transform(oldPointStructure) {
  const newPointStructure = {};

  for (const score in oldPointStructure)
    for (const letter of oldPointStructure[score])
      newPointStructure[letter.toLowerCase()] = Number(score);

  return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   const word = initialPrompt();
   scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScore: simpleScore,
  vowelBonusScore: vowelBonusScore,
  scrabbleScore: scrabbleScore,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

