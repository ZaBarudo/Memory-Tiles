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
timer = document.querySelector('.timer');

start.addEventListener('click', startGame);
playAgain.addEventListener('click', startGame)


let boxSize = TILE_SIZE;
let arrTile = [];
let toBeChosen = [];
let round_number = 1;
let delayInMilliseconds = 500; //1 second
let score = 0;
let lose = false;

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

// Timer function
// function timer(){
//     var sec = 30;
//     var timer = setInterval(function(){
//         document.getElementById('safeTimerDisplay').innerHTML='00:'+sec;
//         sec--;
//         if (sec < 0) {
//             clearInterval(timer);
//         }
//     }, 1000);
// }

// Start Game
function startGame(){
    round_number = 1;
    toBeChosen = [];
    score = 0;
    lose = false;

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
                resultText.textContent = `Score : ${Math.max(0,(round_number-1)*100 - (Sec*1 + min*60))}`
                clearInterval(timerloop);
            }
        }, 100);
    }
    Timer();


    
}

// Displays the pattern for the round
function displayPattern(){
    toBeChosen = [];
    
    // Disabling user tile press
    arrTile.forEach(tile => {
        tile.classList.add('disable');
        console.log(tile);

    } )  
    startText.classList.add('hide');
    
    // Making random tiles blink and adding them to toBeChosen
    for( let i = 0; i < round_number; i++){
        setTimeout(function() {   
            let item = arrTile[Math.floor(Math.random()*arrTile.length)];
            toBeChosen.push(item);
            console.log(item);
            blink(item);    
        }, delayInMilliseconds*(i+1));
    }

    // Alloweing users to click on Tiles
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
    lose = true;
    gameEndSound.play();
    toBeChosen = [];
    result.classList.remove('hide');
}

createInitial();
