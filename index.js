const rules = {
  rock: (option) => (option === "scissors" ? true : false),
  paper: (option) => (option === "rock" ? true : false),
  scissors: (option) => (option === "paper" ? true : false),
};

const playRound = (playerSelection, computerSelection) => {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  if (!rules[playerSelection])
    return "Please choose between rock, paper or scissors";

  if (playerSelection === computerSelection) return "draw";

  if (rules[playerSelection](computerSelection)) {
    return `You win: ${playerSelection} beats ${computerSelection}`;
  } else {
    return `You lose: ${playerSelection} is beaten by ${computerSelection}`;
  }
};

const game = () => {
  for (let i = 0; i < 5; i++) {
    const playerSelection = prompt(
      "Please choose between rock, paper or scissors"
    );
    const computerSelection = getComputerSelection();

    const result = playRound(playerSelection, computerSelection);
    console.log(result);
    const heading = document.createElement("h1");
    heading.innerHTML = result;
    document.body.append(heading);
  }
};

const getComputerSelection = () =>
  ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];

game();
