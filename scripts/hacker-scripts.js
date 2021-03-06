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
const timer = document.querySelector('.timer');
const leaderboard = document.querySelector('.leaderboard');

start.addEventListener('click', startGame);
playAgain.addEventListener('click', startGame)


let boxSize = TILE_SIZE;
let arrTile = [];
let toBeChosen = [];
let toBePopped = []; // a copy of toBeChosen from where tiles will be removed when player clicks
let round_number = 1;
let delayInMilliseconds = 500; 
let score = 0;
let lose = false;
let playerTurn = false;

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
    round_number = 1;
    toBeChosen = [];
    toBePopped = [];
    score = 0;
    lose = false;
    playerTurn = false;

    result.classList.add('hide');
    start.classList.add('hide');
    startText.classList.add('hide');


    displayPattern();

    // Starts the timer for that round
    function Timer(){
        var sec = 0;
        var min = 0;
        var Sec = 0
        var timerloop = setInterval(function(){
            timer.innerHTML= `Time: ${min.toString().padStart(2, '0')}:${Sec.toString().padStart(2, '0')}`;
            sec = sec + 0.1;
            Sec = Math.floor(sec%60);
            min = Math.floor(sec/60);
            if (lose) {
                clearInterval(timerloop);
                score = Math.max(0,(round_number-1)*100 - (Sec*1 + min*60));
                resultText.textContent = `Score : ${score}`
                displayLeaderboard();
            }
        }, 100);
    }
    Timer();


    
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

    // Allowing users to click on Tiles
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
    
    // only if toBeChosen is not empty and it's user's turn
    if(toBePopped && playerTurn){
        tilePress.currentTime = 0;
        tilePress.play();
        if(toBePopped[0]==this){
            // if there is only one tile left
            if(toBePopped.length == 1){
                round_number++;
                displayPattern(); // Go to next round
            }
            else {
                toBePopped.splice(0 , 1);
            }
        }
        else {
            gameOver();
        }
    }
    
}

// Game over function - Displays Play Again
function gameOver(){
    lose = true;
    gameEndSound.currentTime = 0;
    gameEndSound.play();
    toBeChosen = [];
    result.classList.remove('hide');
}

// Display leaderboard
function displayLeaderboard(){
    for(var i = 1; i<=5; i++){
        if(localStorage.getItem(i)){
            if(score>localStorage.getItem(i)){
                moveScoresDown(i);
                break;
            }   
        }else{
            localStorage.setItem(i, score);
            break;
        }
    }

    console.log(localStorage);

    for(var i = 1; i<=5; i++){
        let text = '';
        if(localStorage.getItem(`${i}`)){
            text = `${i}. ${localStorage.getItem(i)}`;
            
        }
        else{
            text = `${i}. 0`;
        }
        document.getElementById(`${i}`).textContent = text;

    }
}

// Inserts a score in particular index in local storage
function moveScoresDown(i){
    var temp = localStorage.getItem(i.toString());
    localStorage.setItem(i.toString(), score);
    for(var j = i+1; j<=4; j++){
        localStorage.setItem(j.toString(), temp);
        if(localStorage.getItem(`${j+1}`)){
            temp = localStorage.getItem(`${j+1}`);
        }
        else {
            break;
        }
        
        
    }
}

createInitial();
