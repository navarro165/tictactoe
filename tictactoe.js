//to clear elements in Jumbotron with the exception of the game gameButton
//also asigns event to clear button function after used once
//calls function to add markers to keep track of score
function clearJumbotronAndAddMarkers(event){
  for (var i = 0; i < jumboElements.length; i++) {
    jumboElements[i].textContent = "";
    jumbotron.style.paddingTop = "0px";
    jumbotron.style.paddingBottom = "0px";
    gameButton.textContent = "Restart Game";
    event.stopImmediatePropagation();
    this.removeEventListener("click",clearJumbotronAndAddMarkers);
    gameButton.click = clearBoard;
    addScoreMarkers();
  }
}


//adding score markers to the jumbotron plus some styling
function addScoreMarkers(){
  userScoreLabel.textContent = "Your Score:";
  computerScoreLabel.textContent = "Computer Score:";
  userScoreValue.textContent = "0";
  computerScoreValue.textContent = "0";
  gameButton.style.marginLeft = "40px";
}


//restart game button
//clears board by changing character to "." and changing its color to white to hide interval
//this is done this way in order to retain the dimensions integrity of the table
function clearBoard(){
  if (gameButton.textContent === "Restart Game" || gameButton.textContent === "New Game") {
    for (var i = 0; i < cells.length; i++) {
      cells[i].textContent = ".";
      cells[i].style.color = "white";
      cells[i].style.backgroundColor = "white";
    }
    gameStarted = false;
    gameOver = false;
  }
}


function colorWhenMouseOver(){
  if (gameOver == false) {
    var currentCell = this;
    setTimeout(function(){
      if (currentCell.textContent == "."){
        currentCell.style.backgroundColor = "rgba(230, 57, 70,0.3)";
        currentCell.style.color = "rgba(230, 57, 70,0.01)";
      }
    }, 10);
  }
}


function colorWhenMouseOut(){
    if (gameOver == false) {
      var currentCell = this;
      setTimeout(function(){
        if (currentCell.textContent == "."){
          currentCell.style.backgroundColor = "white";
          currentCell.style.color = "white";
        }
      }, 60);
    }
  }



//change marker for user only. User is assigned to use X always
//after user makes moves, the computer automatically responds with a move
//checks if condition to add user score are present
//this function also changes the name of the button back to restart game once a moved has been done by user
function changeCellMarker(){
  if (gameButton.textContent === "New Game" && checkAvailableCells(true) == 9) {
      gameButton.textContent = "Restart Game";
  }
  if (gameOver == false) {
    if (this.textContent != "O" && this.textContent != "X" && didComputerMakeMove === true  && (checkAvailableCells(true) > 2)) {
      if (gameButton.textContent == "Restart Game") {
        if (this.textContent === ".") {
          this.textContent = "X";
          this.style.color = "black";
          this.style.backgroundColor = "rgba(230, 57, 70,0.6)";
          gameStarted = true;
        } else {
          this.textContent = ".";
          this.style.color = "white";
        }
        gameScore("X");
        didComputerMakeMove = false;
        setTimeout(computerMakesMove,700);
      }
    }
  }
}


//checks for available cells then places a O character
function computerMakesMove(){
  checkAvailableCells();
  computerResponds();
  availableCellsIndex = []; //emptying array
  didComputerMakeMove = true;
}


//inserts O character in empty cell
//checks if condition to add computer score are present
function computerResponds(){
  if (gameOver == false && gameStarted == true) {
    var randomIndex = availableCellsIndex[Math.floor(Math.random() * availableCellsIndex.length)];
    cells[randomIndex].textContent = "O";
    cells[randomIndex].style.color = "black";
    cells[randomIndex].style.backgroundColor = "rgba(69, 118, 158 ,0.6)";
    gameScore("O");
  }
}


//creates new array with each move that holds the index locations of empty cells
//this function will also be called in order to make sure the user doesnt keep playing
//when only 1 cell is left empty
//only when check is true will this function return the length of the avaible cells
function checkAvailableCells(check){
  var temp = 0;
  if (check) {
    availableCellsIndex = []; //emptying array
    for (var i = 0; i < cells.length; i++) {
      if (cells[i].textContent == ".") {
        availableCellsIndex.push(i);
      }
    }
    temp = availableCellsIndex.length;
    availableCellsIndex = [];
    return temp;
  } else {
    for (var i = 0; i < cells.length; i++) {
      if (cells[i].textContent == ".") {
        availableCellsIndex.push(i);
      }
    }
  }
}


//checks for all permutation that would either determine a winner or determine end of game
//everytime the player or computer make a move, call this function to see if game is over
function gameScore(character){
  if (cells[0].textContent === character && cells[1].textContent === character && cells[2].textContent === character) {
      ifCorrectPermutationDo(0,1,2,character);
  } else if (cells[3].textContent === character && cells[4].textContent === character && cells[5].textContent === character) {
      ifCorrectPermutationDo(3,4,5,character);
  } else if (cells[6].textContent === character && cells[7].textContent === character && cells[8].textContent === character) {
      ifCorrectPermutationDo(6,7,8,character);
  } else if (cells[0].textContent === character && cells[4].textContent === character && cells[8].textContent === character) {
      ifCorrectPermutationDo(0,4,8,character);
  } else if (cells[2].textContent === character && cells[4].textContent === character && cells[6].textContent === character) {
      ifCorrectPermutationDo(2,4,6,character);
  } else if (cells[0].textContent === character && cells[3].textContent === character && cells[6].textContent === character) {
      ifCorrectPermutationDo(0,3,6,character);
  } else if (cells[1].textContent === character && cells[4].textContent === character && cells[7].textContent === character) {
      ifCorrectPermutationDo(1,4,7,character);
  } else if (cells[2].textContent === character && cells[5].textContent === character && cells[8].textContent === character) {
      ifCorrectPermutationDo(2,5,8,character);
  } else if (checkAvailableCells(true) == 1) {
      gameButton.textContent = "New Game";
  }
}


//what happens when there's a winner
//gameOver variable is being used to control if computer should make move
function ifCorrectPermutationDo(cell1,cell2,cell3,character){
  gameOver = true;
  changeScore(character);
  displayWinningCells(cell1,cell2,cell3,character);
  gameButton.textContent = "New Game";
}


//adds 1 to current value in marker
function changeScore(char){
  if (char === "X"){
    userScoreValue.textContent = String(Number((userScoreValue.textContent),10)+1);
  } else if (char === "O") {
    computerScoreValue.textContent = String(Number((computerScoreValue.textContent),10)+1);
  }
}


//color of winner will be displayed with delay between highlighted cells
function displayWinningCells(one,two,three,chr){
  setTimeout(function(){
    clearBoard();
  }, cellScoreDelay);
  if (chr === "X"){
    setTimeout(function(){
      cells[one].style.backgroundColor = "rgb(230, 57, 70)";
      cells[one].textContent = chr;
    }, cellScoreDelay + cellScoreDelayOffset);

    setTimeout(function(){
      cells[two].style.backgroundColor = "rgb(230, 57, 70)";
      cells[two].textContent = chr;
    }, cellScoreDelay + 2*cellScoreDelayOffset);

    setTimeout(function(){
      cells[three].style.backgroundColor = "rgb(230, 57, 70)";
      cells[three].textContent = chr;
    }, cellScoreDelay + 3*cellScoreDelayOffset);

  } else if (chr === "O") {
      setTimeout(function(){
        cells[one].style.backgroundColor = "rgb(69, 118, 158)";
        cells[one].textContent = chr;
      }, cellScoreDelay + cellScoreDelayOffset);

      setTimeout(function(){
        cells[two].style.backgroundColor = "rgb(69, 118, 158)";
        cells[two].textContent = chr;
      }, cellScoreDelay + 2*cellScoreDelayOffset);

      setTimeout(function(){
        cells[three].style.backgroundColor = "rgb(69, 118, 158)";
        cells[three].textContent = chr;
      }, cellScoreDelay + 3*cellScoreDelayOffset);
  }
}


//DOM variables
var gameButton = document.querySelector("#game");
var jumboElements = document.querySelectorAll(".jumbo");
var jumbotron = document.querySelector(".jumbotron");
var cells = document.querySelectorAll(".cell");
var userScoreLabel = document.querySelector(".badge-success");
var computerScoreLabel = document.querySelector(".badge-danger");
var userScoreValue = document.querySelector("#userScore");
var computerScoreValue = document.querySelector("#computerScore");

//other variables
var gameStarted = false; //to check if the game has game has Started
var availableCellsIndex = [];
var didComputerMakeMove = true;
var gameOver = false;
var cellScoreDelay = 300;
var cellScoreDelayOffset = 50;


//gamebutton and its two event listeners in their corresponding order
gameButton.addEventListener("click",clearJumbotronAndAddMarkers);
gameButton.addEventListener("click",clearBoard);

//behavior for cells when hovering on them and clicking them
//enable user to assign value to specific cell
//color indicator when hovering above cell
//check for posibility of score with every click
for (var i = 0; i < cells.length ; i++) {
    cells[i].addEventListener("mouseover",colorWhenMouseOver);
    cells[i].addEventListener("mouseout",colorWhenMouseOut);
    cells[i].addEventListener("click",changeCellMarker);
}
