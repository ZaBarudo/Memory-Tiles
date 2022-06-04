const TILE_SIZE = 50;
const GRID_SIZE = 6;

const grid = document.querySelector('.grid');
const start = document.querySelector('.start');
const playAgain = document.querySelector('.gameover');
const result = document.querySelector('.result');
const resultText = document.querySelector('.resultText');
const startText = document.querySelector('.startText');
const gameEndSound = document.querySelector('#gameEndSound');
const tilePress = document.querySelector('#tilePress');
const doneBtn = document.querySelector('.done');

start.addEventListener('click', startGame);
playAgain.addEventListener('click', startGame);
doneBtn.addEventListener('click', donePattern);


let boxSize = TILE_SIZE;
let arrTile = [];
let toBeChosen = [];
let toBePopped = []; // a copy of toBeChosen from where tiles will be removed when player clicks
let delayInMilliseconds = 500; 
let lose = false;
let playerTurn = 'none';
let player = 2;

// defining grid
grid.setAttribute('style',
    `grid-template-columns: repeat(${GRID_SIZE}, ${TILE_SIZE}px);
    grid-template-rows: repeat(${GRID_SIZE}, ${TILE_SIZE}px);` 
);


  
// Creating initial grid
function createInitial(){
    for(let i=0; i<GRID_SIZE**2; i++){
        arrTile[i] = document.createElement('div');
        arrTile[i].classList.add('tile');
        arrTile[i].setAttribute('style', `height: ${boxSize}px; width: ${boxSize}px; user-select:none;`);
        arrTile[i].addEventListener('click', userPress);
        arrTile[i].addEventListener('transitionend', blinkEnd);
        
        grid.appendChild(arrTile[i]);
    }

}

// Make a tile blink
function blink(tile){
    tile.classList.add('blink');
}

function blinkEnd(){
    this.classList.remove('blink');
}


// Start Game
function startGame(){
    toBeChosen = [];
    toBePopped = [];
    lose = false;
    playerTurn = 'none';
    player = 3 - player;

    result.classList.add('hide');
    start.classList.add('hide');
    startText.classList.remove('hide');
    startText.textContent = `Player ${player}'s turn to choose pattern`;
    doneBtn.classList.remove('hide');

    
    playerTurn = 'choose';

}

// Function called when user presses done after coosing patter (question)
// Add done button later
function donePattern(){
    for( let i = 0; i < toBeChosen.length; i++){
        toBeChosen[i].classList.remove('blink');
    }
    console.log(toBeChosen.length);
    if(toBeChosen.length!=0){
        player = 3 - player;
        startText.textContent = `Player ${player}'s turn to play`;
        playerTurn = 'none';
        displayPattern();
    }
    else {
        startText.textContent = 'No Pattern was chosen. Try Again';
    }

}


// Displays the pattern for the round
function displayPattern(){
    
    doneBtn.classList.add('hide');
    // Making tiles blink
    for( let i = 0; i < toBeChosen.length; i++){
        setTimeout(function() {   
            blink(toBeChosen[i]);    
        }, delayInMilliseconds*(i+1));
    }

    // Allowing users to click on Tiles
    setTimeout(() => {  

        playerTurn = 'play'; // player can play now

    }, delayInMilliseconds*toBeChosen.length + 250);
}

// User presses Tile
function userPress(){
    
    // only if toBeChosen is not empty and it's user's turn
    if(toBePopped && playerTurn == 'play'){
        tilePress.currentTime = 0;
        tilePress.play();
        if(toBePopped[0]==this){
            // if there is only one tile left
            if(toBePopped.length == 1){
                startGame(); // Go to next round
            }
            else {
                toBePopped.splice(0 , 1);
            }
        }
        else {
            gameOver();
        }
    } else if(playerTurn == 'choose') {
        this.classList.add('blink');
        toBeChosen.push(this);
        toBePopped = [...toBeChosen];
    }
    
}

// Game over function - Displays Play Again
function gameOver(){
    gameEndSound.currentTime = 0;
    gameEndSound.play();
    result.classList.remove('hide');
    resultText.textContent = `Player ${3-player} Wins!`;
}



createInitial();
