const rules = {
  rock: (option) => {
    option === "scissors" ? true : false;
  },
  paper: (option) => {
    option === "rock" ? true : false;
  },
  scissors: (option) => {
    option === "paper" ? true : false;
  },
};

const playRound = (playerSelection, computerSelection) => {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  if (playerSelection === computerSelection) return "draw";

  if (rules[playerSelection](computerSelection)) {
    return `You win: ${playerSelection} beats ${computerSelection}`;
  } else {
    return `You lose: ${playerSelection} is beaten by ${computerSelection}`;
  }

  return "Please choose between rock, paper or scissors";
};

const getComputerSelection = () =>
  ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];

const playerSelection = "rock";
const computerSelection = getComputerSelection();

console.log(computerSelection);
