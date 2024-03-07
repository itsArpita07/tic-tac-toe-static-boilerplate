document.addEventListener("DOMContentLoaded", function () {
    const result = document.getElementById("result");
    const boxes = document.getElementsByClassName("box");
    const button = document.getElementById("button");
    let xArr = [];
    let oArr = [];
    let currentPlayer = "O"; // Define currentPlayer to keep track of whose turn it is
    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", handleClick);
    }
    
    let gameOver = false; // Use a flag to indicate if the game is over
    
    function handleClick(e) {
        if (!e.target.innerText && !gameOver) {
            const index = parseInt(e.target.id);
            e.target.innerHTML = `<h2>${currentPlayer}</h2>`;
            currentPlayer = currentPlayer === "O" ? "X" : "O";
            updateBoard(index); // Update the board with the current player's move
            const winner = checkWinner();
            if (winner) {
                gameOver = true;
                showResult(winner);
            } else if (isBoardFull()) {
                gameOver = true;
                showResult("Draw");
            }
        }
    }
    
    function updateBoard(index) {
        if (currentPlayer === "X") {
            xArr.push(index);
        } else {
            oArr.push(index);
        }
    }
    
    function checkWinner() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (xArr.includes(a) && xArr.includes(b) && xArr.includes(c)) {
                return "X";
            } else if (oArr.includes(a) && oArr.includes(b) && oArr.includes(c)) {
                return "O";
            }
        }
        return null;
    }
    
    function isBoardFull() {
        return xArr.length + oArr.length === 9;
    }
    
    function showResult(char) {
        result.innerText = char === "Draw" ? `${char}` : `${char} Won`;
        result.style.visibility = "visible";
        
    }
    
    button.onclick = () => {
        resetGame();
    };
    
    function resetGame() {
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML = '';
        }
        result.style.visibility = 'hidden';
        button.style.display = 'none';
        xArr = [];
        oArr = [];
        currentPlayer = "O";
        gameOver = false;
    }
});
