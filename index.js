const createChoice = (id, src, strength) => {
	return {
		id,
		src,
		beats: (choice) => (choice === strength ? true : false),
	};
};

const choices = {
	rock: createChoice("rock", "images/rock-svgrepo-com.svg", "scissors"),
	paper: createChoice("paper", "images/paper-svgrepo-com.svg", "rock"),
	scissors: createChoice(
		"scissors",
		"images/scissors-svgrepo-com.svg",
		"paper"
	),
};

const playRound = (playerSelection, computerSelection) => {
	playerSelection = playerSelection.toLowerCase();
	computerSelection = computerSelection.toLowerCase();

	if (
		["rock", "paper", "scissors"].every((choice) => choice !== playerSelection)
	)
		return "Please choose between rock, paper or scissors";

	if (playerSelection === computerSelection) return "draw";

	if (choices[playerSelection].beats(computerSelection)) {
		incrementPlayerScore();
		return `You win: ${playerSelection} beats ${computerSelection}`;
	} else {
		incrementComputerScore();
		return `You lose: ${playerSelection} is beaten by ${computerSelection}`;
	}
};

const game = (rounds) => {
	for (let i = 0; i < rounds; i++) {
		const playerSelection = prompt(
			"Please choose between rock, paper or scissors"
		);
		const computerSelection = getComputerSelection();

		const result = playRound(playerSelection, computerSelection);
		console.log(result);
	}
};

const getComputerSelection = () =>
	["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];

// game(5);

const makeChoice = (e) => {
	let choice = e.currentTarget.id;
	let compChoice = getComputerSelection()

	replaceWithPlayerChoice(createWeaponComponent(choices[choice]));
	replaceWithComputerChoice(
		createWeaponComponent(choices[compChoice])
	);
	console.log(playRound(choice, compChoice));
};

const { rock, paper, scissors } = choices;
// UI

// makes a ui component for the weapon choice
const createWeaponComponent = ({ id, src, ...rest }) => {
	let weaponContainer = document.createElement("div");
	weaponContainer.id = id;
	weaponContainer.className = "weapon-container";
	weaponContainer.addEventListener("click", makeChoice);

	let weaponImg = document.createElement("img");
	weaponImg.className = `weapon-img ${id}`;
	weaponImg.src = src;
	weaponImg.width = 100;

	let weaponTitle = document.createElement("span");
	weaponTitle.className = "weapon-title";
	weaponTitle.innerHTML = `${id}`;
	weaponTitle.style.textTransform = "uppercase";

	weaponContainer.append(weaponImg);
	weaponContainer.append(weaponTitle);

	return weaponContainer;
};

// makes a ui component for the sides of battle
const makeSide = (side) => {
	const sideContainer = document.createElement("div");
	sideContainer.className = "side-container";

	const scoreEl = document.createElement("span");
	let score = 0;
	scoreEl.innerHTML = score;
	scoreEl.className = "score";

	let sideChoice = createWeaponComponent({
		id: side,
		src: "images/question-circle-svgrepo-com.svg",
	});

	sideContainer.append(scoreEl);
	sideContainer.append(sideChoice);

	return [
		sideContainer,
		(replacement) => {
			sideContainer.removeChild(sideChoice);
			sideChoice = replacement;
			sideContainer.append(sideChoice);
		},
		() => {
			score++;
			scoreEl.innerHTML = score;
		},
		() => {
			score = 0;
			scoreEl.innerHTML = score;
		},
	];
};

// creating elements
const selectionContainer = document.createElement("div");
selectionContainer.className = "selection-container";

const selectionHeader = document.createElement("h1");
selectionHeader.className = "selection-header";
selectionHeader.innerHTML = `Please choose your weapon of choice:`;

const weaponChoicesContainer = document.createElement("div");
weaponChoicesContainer.className = "weapon-choices-container";

const rockComponent = createWeaponComponent(rock);
const paperComponent = createWeaponComponent(paper);
const scissorsComponent = createWeaponComponent(scissors);

const sidesContainer = document.createElement("div");
sidesContainer.className = "sides-container";

const [
	playerSide,
	replaceWithPlayerChoice,
	incrementPlayerScore,
	resetPlayerScore,
] = makeSide("player");
const [
	computerSide,
	replaceWithComputerChoice,
	incrementComputerScore,
	resetComputerScore,
] = makeSide("computer");

// appends
selectionContainer.append(selectionHeader);

weaponChoicesContainer.append(rockComponent);
weaponChoicesContainer.append(paperComponent);
weaponChoicesContainer.append(scissorsComponent);

selectionContainer.append(weaponChoicesContainer);

document.body.append(selectionContainer);

sidesContainer.append(playerSide);
sidesContainer.append(computerSide);

document.body.append(sidesContainer);
