//set initial scores
let humanScore = 0;
let computerScore = 0;

//DOM elements

const roundResultText = document.getElementById("round-result");
const scoreText = document.getElementById("score");
const gameWinnerNode = document.getElementById("game-winner");
const buttons = document.querySelectorAll("button");

//Computer Choice to be random
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
console.log(getComputerChoice())

//humanChoice function becomes obsolete
// function getHumanChoice() {
//     const userInput = prompt("Enter rock, paper, or scissors:");
//     return userInput.toLowerCase();
// }

//event listeners for each button 
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // We use the button's ID ("rock", "paper", "scissors") as the human choice
        playRound(button.id); 
    });
});

function playRound(humanChoice) {
    // Prevent further play if someone already won
    if (humanScore >= 5 || computerScore >= 5) return; 

    const computerChoice = getComputerChoice();
    let resultMessage = "";

    // Determine round winner
    if (humanChoice === computerChoice) {
        resultMessage = `It's a tie! Both chose ${humanChoice}.`;
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        humanScore++;
        resultMessage = `You win! ${humanChoice} beats ${computerChoice}.`;
    } else {
        computerScore++;
        resultMessage = `You lose! ${computerChoice} beats ${humanChoice}.`;
    }

    // Update DOM with results and score
    roundResultText.textContent = resultMessage;
    scoreText.textContent = `Human: ${humanScore} | Computer: ${computerScore}`;

    // Check if anyone has reached 5 points
    checkWinner();
}
// 5. Check Win Condition
function checkWinner() {
    if (humanScore === 5) {
        gameWinnerNode.textContent = "Congratulations! You won the game!";
        disableButtons();
    } else if (computerScore === 5) {
        gameWinnerNode.textContent = "Game Over! The computer wins.";
        disableButtons();
    }
}

// Helper function to turn off buttons once game ends
function disableButtons() {
    buttons.forEach(button => {
        button.disabled = true;
    });
}
