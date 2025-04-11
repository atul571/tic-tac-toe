let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // true for '0', false for 'X'

const winPatterns = [
   [0, 1, 2],
   [0, 3, 6],
   [0, 4, 8],
   [1, 4, 7],
   [2, 5, 8],
   [2, 4, 6],
   [3, 4, 5],
   [6, 7, 8],
];

// Function to reset the game
const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Add click event listeners to boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkwinner();
    });
});

// Disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes and clear text
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Show winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check for winner or draw
const checkwinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                winnerFound = true;
                return;
            }
        }
    }

    // Draw check
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (!winnerFound && allFilled) {
        msg.innerText = `It's a Draw!`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

// Add event listeners to buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
