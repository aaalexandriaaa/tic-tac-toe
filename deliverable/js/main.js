/*------Constants------*/
const colors = {
    '0' : 'white',
    '1' : 'purple',
    '-1' : 'lime'
};

const winCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

/*------Variables (state)------*/
let board, turn, winner;

/*------Cached Element References------*/
let turnMessage = document.getElementById('message');
const resetBtn = document.getElementById('reset');
const boardEls = document.getElementsByClassName("board")[0];
const squares = boardEls.children;

/*------Event Listeners------*/
resetBtn.addEventListener('click', function(){
    init();
});

for (let index = 0; index < squares.length; index++) {
    const square = squares[index];
    square.onclick = playerClick;
}

/*------Functions------*/
// Initialization function:
function init(){
    turnMessage.innerText = "Choose yer poison"
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 1; //begin with player x
    winner = 0; // winner = 1 if EX wins; winner = -1 if OH wins; winner = T if there's a tie.
    render(squares, board, winner, turn);
}

// On-Click function:
function playerClick(evt){
    if (winner !== 0 || board[evt.target.id] !== 0){  //evt.target.id gives us a string type, but we're taking advantage of type coercion!
        return
    } else if (board[evt.target.id] === 0){
        board[evt.target.id] = turn; //update board array
        isWinner();
        turn *= -1;
        render(squares, board, winner, turn); //visually render what they've clicked
    }
}

// Check winner function:
function isWinner() {
    winCombos.forEach((elem) => {
        if (3*turn === (board[elem[0]] + board[elem[1]] + board[elem[2]])) {
            winner = turn
            return
        } 
    })
    if (board.filter(element => element === 0).length === 0){
        winner = 'T';
        return
    }
}    

// Render function:
function render(squares, board, winner, turn){
    renderBoard(squares, board)
    renderMessage(winner, turn)
}

function renderBoard(squares, board){
    for (let i = 0; i < board.length; i++){
        squares[i].style.backgroundColor = colors[board[i]];
    }
}

function renderMessage(winner, turn){
    if (winner === 0){
        turnMessage.innerHTML = `It's ${colors[turn].toUpperCase()} TIME!`
    } else if (winner === 'T'){
        turnMessage.innerHTML = `It's a TIE!`
    } else {
        turnMessage.innerHTML = `${colors[winner].toUpperCase()} WINS`
    }
}

init()

