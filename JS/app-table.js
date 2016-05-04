var panel1 = document.getElementById('panel1');

function handlePanel1() {
  makeGameArray(classicItemInfo);
};

panel1.addEventListener('click', handlePanel1);

var panel2 = document.getElementById('panel2');
function handlePanel2() {
  makeGameArray(taItemInfo);
}
panel2.addEventListener('click', handlePanel2);

// var panel3 = document.getElementById('panel3');
// function handlePanel3() {
//   makeGameArray(customItemInfo);
// }
// panel3.addEventListener('click', handlePanel3);
//getting info from the local storage
var allUsersArray = [];
(function getUserNameFromLocalStorage () {
  if(localStorage.userName){
    console.log('localStorage for userName exist');
    userName = JSON.parse(localStorage.userName);
  }else{
    console.log('localStorage for userName doesn\'t exist');
  };
})();

(function getAllUsersArrayFromLocalStorage () {
  if(localStorage.allUsersArray){
    console.log('localStorage for uallUsersArray exist');
    allUsersArray = JSON.parse(localStorage.allUsersArray);
  }else{
    console.log('localStorage for allUsersArray doesn\'t exist');
  };
})();

function UserProfile(nameInput, userScore) {
  this.userName = nameInput;
  this.userScore = userScore;
}
var itemArray = new Array(3);
var classicItemInfo = [['rock', '../assets/rock.jpeg'],
                ['paper', '../assets/paper.jpeg'],
                ['scissor', '../assets/scissor.png']];

var taItemInfo = [['Dan', '../assets/Dan.png'],
['Jonathan', '../assets/Jonathan.jpeg'],
['Katie', '../assets/katie.jpeg']];

var customItemInfo = [];

var userWins = 0;
var rounds = 7;
var initialNumberOfRounds = 7;

function RPSItem(name, url) {
  this.name = name;
  this.url = url;
  this.beat = null;
}

RPSItem.prototype.setBeat = function(other) {
  this.beat = other;
};

function makeGameArray(inputInfo) {
  for(var i = 0; i < inputInfo.length; i++) {
    var item = new RPSItem(inputInfo[i][0], inputInfo[i][1]);
    itemArray[i] = item;
  }

  itemArray[0].setBeat(itemArray[itemArray.length - 1]);
  for (var j = 1; j < itemArray.length; j++) {
    itemArray[j].setBeat(itemArray[j - 1]);
  }
}
// populate array with classic items
//makeGameArray(classicItemInfo);

//generate random number for computer choice
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// getRandomInt(arrayItem.length);

// 0 = draw
// -1 = user lost
// 1 = user win
function oneRound(userInput) {
  var computerInput = itemArray[getRandomInt(itemArray.length)];
  console.log('comp input is ' + computerInput.name);
  var roundWinner = document.getElementById('round-winner');
  roundWinner.removeAttribute('hidden');
  var p = document.getElementById('round-message');
  if (userInput.beat === computerInput.beat) {
    p.textContent = 'It\'s a tie!';
    return 0;
  } else if (userInput.beat === computerInput) {
    p.textContent = 'You won!';
    userWins++;
    return 1;
  } else {
    p.textContent = 'You lost!';
    return -1;
  }
}

// console.log(oneRound(itemArray[0]));

var userInputContainer = document.getElementById('user-input-container');
userInputContainer.addEventListener('click', processUserSelection);

var userInputContainer2 = document.getElementById('user-input-container2');
userInputContainer2.addEventListener('click', processUserSelection);

var userInputContainer3 = document.getElementById('user-input-container3');
userInputContainer3.addEventListener('click', processUserSelection);

function processUserSelection(event) {
  if (rounds) {
    var clickedOnDiv = parseInt(event.target.parentNode.id);
    console.log('user clicked on div number ' + clickedOnDiv);
    if (!isNaN(clickedOnDiv)) {
      var userInput = itemArray[parseInt(clickedOnDiv)];
      console.log('user input is ' + userInput.name);
      console.log(oneRound(userInput));
      // reportOneRound();
    }
    rounds--;
    console.log('number of ' + rounds);
    if (rounds == 0) {
      displayResult();
    }
  }
}

function displayResult() {
  var math = (userWins / initialNumberOfRounds) * 100;
  var gameWinner = document.getElementById('game-winner');
  var roundWinner = document.getElementById('round-winner');
  var interactionPanel = document.getElementById('interaction-panel');
  gameWinner.removeAttribute('hidden');
  roundWinner.setAttribute('hidden', 'hidden');
  interactionPanel.setAttribute('hidden', 'hidden');
  var p = document.getElementById('game-message');
  if (math > 50) {
    p.textContent = 'Congratulations! You are the winner!';
    console.log('done');
    console.log('You\'ve won ' + userWins + ' out of ' + initialNumberOfRounds);
  } else {
    p.textContent = 'You lost!';
    console.log('done');
    console.log('You lost ' + userWins + ' out of ' + initialNumberOfRounds + '!');
  }
  var buttonDisplay = document.getElementById('button-display');
  buttonDisplay.removeAttribute('hidden');
}

var scoreTable = document.getElementById('score-table');
//table header
function tableHeader(){
  var tr = document.createElement('tr');
  var th = document.createElement('th');
  th.textContent = 'Player';
  tr.appendChild(th);
  var th = document.createElement('th');
  th.textContent = 'Score';
  tr.appendChild(th);
  scoreTable.appendChild(tr);
}

// var Jam = new UserProfile('Jam', 5);
// var Vien = new UserProfile('Vien', 7);
// var Jeremy = new UserProfile('Jeremy', 2);
// var Tatiana = new UserProfile('Tatiana', 3);

// var userProfile = [];
//rendering scores

function sortAllUserArray(objectArray){
  function byUserScore(a, b) {
    return parseInt(b.userScore) - parseInt(a.userScore);
  };
  return objectArray.sort(byUserScore);
}
var newUser;
function renderScore() {
  if(scoreTable.textContent === ''){
    var highScore = parseInt(userWins * 1000 / initialNumberOfRounds);
    newUser = new UserProfile(userName, highScore);
    allUsersArray.push(newUser);
    sortAllUserArray(allUsersArray);
    localStorage.setItem('allUsersArray', JSON.stringify(allUsersArray));
    tableHeader();
//render table
    for(var i = 0; i < allUsersArray.length; i++){
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.textContent = allUsersArray[i].userName;
      console.log(allUsersArray[i].userName);
      tr.appendChild(td);
      var td = document.createElement('td');
      td.textContent = allUsersArray[i].userScore;
      console.log(allUsersArray[i].userScore);
      tr.appendChild(td);
      scoreTable.appendChild(tr);
    }
  }
}
var button2 = document.getElementById('button2');
button2.addEventListener('click', renderScore);

var button3 = document.getElementById('button3');
button3.addEventListener('click', function(){
  // localStorage.allUsersArray = '';
  localStorage.clear();
  scoreTable.textContent = '';
});

var userInputContainer = document.getElementById('user-input-container');
userInputContainer.addEventListener('click', processUserSelection);

var customInput = document.getElementById('custom-input');
customInput.addEventListener('submit', handleCustomInput);

var custom1 = [];
var custom2 = [];
var custom3 = [];

function handleCustomInput(event) {
  console.log('hello!');
  event.preventDefault();
  var photo1 = event.target.photo1.value;
  var url1 = event.target.url1.value;
  custom1.push(photo1, url1);
  var photo2 = event.target.photo2.value;
  var url2 = event.target.url2.value;
  custom2.push(photo2, url2);
  var photo3 = event.target.photo3.value;
  var url3 = event.target.url3.value;
  custom3.push(photo3, url3);
  customItemInfo.push(custom1, custom2, custom3);
  makeGameArray(customItemInfo);
  renderCustomImages();
};

var appendImages = document.getElementById('append-images');

function renderCustomImages() {
  customInput.setAttribute('hidden', 'hidden');
  for (var i = 0; i < customItemInfo.length; i ++) {
    var singleImage = document.createElement('div');
    singleImage.innerHTML = '<img src ="' + customItemInfo[i][1] + '">';
    singleImage.id = i;
    appendImages.appendChild(singleImage);
  }
}
