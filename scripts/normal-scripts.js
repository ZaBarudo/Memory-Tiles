TILE_SIZE = 60;
GRID_SIZE = 4;

grid = document.querySelector('.grid');
start = document.querySelector('.start');
playAgain = document.querySelector('.gameover');
result = document.querySelector('.result');
resultText = document.querySelector('.resultText');
startText = document.querySelector('.startText');

start.addEventListener('click', startGame);
playAgain.addEventListener('click', startGame)


let boxSize = TILE_SIZE;
let arrTile = [];
let toBeChosen = []; // holds the current tiles in the round
let toBePopped = []; // a copy of toBeChosen from where tiles will be removed when player clicks
let round_number = 1;
let delayInMilliseconds = 500;
let score = 0;
let playerTurn = false;

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
    round_number = 1;
    toBeChosen = [];
    toBePopped = [];
    score = 0;
    playerTurn = false;

    result.classList.add('hide');
    start.classList.add('hide');
    startText.classList.add('hide');


    displayPattern();


    
}

// Displays the pattern for the round
function displayPattern(){
    
    // Disabling user tile press
    arrTile.forEach(tile => {
        tile.classList.add('disable');
    } )  
    startText.classList.add('hide');
    let item = arrTile[Math.floor(Math.random()*arrTile.length)];
    toBeChosen.push(item);
    toBePopped = [...toBeChosen];
    // Making random tiles blink and adding them to toBeChosen
    for( let i = 0; i < toBeChosen.length; i++){
        setTimeout(function() {   
            blink(toBeChosen[i]);    
        }, delayInMilliseconds*(i+1));
    }

    setTimeout(() => {   
        playerTurn = true; // player can play now
        startText.classList.remove('hide');
        arrTile.forEach(tile => {
        tile.classList.remove('disable');
    } ) 
    }, delayInMilliseconds*round_number + 250);
    
    
    
}


// User presses Tile
function userPress(){
    
    if(toBePopped && playerTurn){
        if(toBePopped.includes(this)){

            if(toBePopped.length == 1){
                score++;
                round_number++;
                displayPattern();
            }
            else {
                toBePopped.splice(toBePopped.indexOf(this) , 1);
            }
            
        }
        else {
        
            gameOver();
        }
    }
    
}

// Game over function - Displays Play Again
function gameOver(){
    toBeChosen = [];
    result.classList.remove('hide');
    resultText.textContent = `Score : ${score}`;
}

createInitial();
