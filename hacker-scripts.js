TILE_SIZE = 50;
GRID_SIZE = 6;

grid = document.querySelector('.grid');
start = document.querySelector('.start');
playAgain = document.querySelector('.gameover');
result = document.querySelector('.result');
resultText = document.querySelector('.resultText');
startText = document.querySelector('.startText');
gameEndSound = document.querySelector('#gameEndSound');
tilePress = document.querySelector('#tilePress');

start.addEventListener('click', startGame);
playAgain.addEventListener('click', startGame)


let boxSize = TILE_SIZE;
let arrTile = [];
let toBeChosen = [];
let round_number = 1;
let delayInMilliseconds = 500; //1 second
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
    score = 0;
    playerTurn = false;

    result.classList.add('hide');
    start.classList.add('hide');
    startText.classList.add('hide');


    displayPattern();


    
}

// Displays the pattern for the round
function displayPattern(){
    toBeChosen = [];
    
    arrTile.forEach(tile => {
        tile.classList.add('disable');
        console.log(tile);

    } )  
    startText.classList.add('hide');
    
    for( let i = 0; i < round_number; i++){
        setTimeout(function() {   
            let item = arrTile[Math.floor(Math.random()*arrTile.length)];
            toBeChosen.push(item);
            console.log(item);
            blink(item);    
        }, delayInMilliseconds*(i+1));
    }
    setTimeout(() => {   
        arrTile.forEach(tile => {
        tile.classList.remove('disable');
        startText.classList.remove('hide');
    } ) 
    }, delayInMilliseconds*round_number + 250);
    
    
    
}


// User presses Tile
function userPress(){
    
    if(toBeChosen){
        tilePress.play();
        if(toBeChosen[0]==this){

            if(toBeChosen.length == 1){
                score++;
                round_number++;
                displayPattern();
            }
            else {
                toBeChosen.splice(0 , 1);
            }
            
        }
        else {
        
            gameOver();
        }
    }
    
}

// Game over function - Displays Play Again
function gameOver(){
    gameEndSound.play();
    toBeChosen = [];
    result.classList.remove('hide');
    resultText.textContent = `Score : ${score}`;
}

createInitial();
