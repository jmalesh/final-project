var itemArray = new Array(3);
var classicItemInfo = [['rock', 'assets/rock.png'],
                ['paper', 'assets/paper.jpeg'],
                ['scissor', 'assets/scissor.png']];

var tasItemInfo = [['Dan', 'assets/Dan.png'],
                ['Jonathan', 'assets/Jonathan.jpeg'],
                ['Katie', 'assets/katie.jpeg']];

var customItemInfo = [];

var userWins = 0;
var rounds = 7;
var initialNumberOfRounds = 7;


var classicTextContainer = document.getElementById('classic-text-container');
var classicText = document.getElementById('classic-text');

var tasTextContainer = document.getElementById('tas-text-container');
var tasText = document.getElementById('tas-text');

var customTextContainer = document.getElementById('custom-text-container');
var customText = document.getElementById('custom-text');

var classicPlayButton = document.getElementById('classic-play-button');
var classicPlayButtonContainer = document.getElementById('classic-play-button-container');

var tasPlayButton = document.getElementById('tas-play-button');
var tasPlayButtonContainer = document.getElementById('tas-play-button-container');

var customPlayButton = document.getElementById('custom-play-button');
var customPlayButtonContainer = document.getElementById('custom-play-button-container');


classicPlayButton.addEventListener('click', classicPlay);
tasPlayButton.addEventListener('click', tasPlay);
customPlayButton.addEventListener('click', customPlay);

var classicUserInteractionPanelContainer = document.getElementById('classic-user-interaction-panel-container');
var tasUserInteractionPanelContainer = document.getElementById('tas-user-interaction-panel-container');
var customUserInteractionPanelContainer = document.getElementById('custom-user-interaction-panel-container');

var classicResultContainer = document.getElementById('classic-round-result-container');

function createClassicInteractionPanel() {
  var userInteractionPanel = document.createElement('div');
  userInteractionPanel.className = 'classic-user-interaction-panel';
  userInteractionPanel.id = 'classic-user-interaction-panel';

  for (var i = 0; i < 3; i++) {
    var imgDiv = document.createElement('div');
    imgDiv.id = 'div' + i;
    var img = document.createElement('img');
    img.src = itemArray[i].url;
    imgDiv.appendChild(img);
    userInteractionPanel.appendChild(imgDiv);
  }

  userInteractionPanel.addEventListener('click', processUserSelection);
  classicUserInteractionPanelContainer.appendChild(userInteractionPanel);
}

function createTasInteractionPanel() {
  var userInteractionPanel = document.createElement('div');
  userInteractionPanel.className = 'tas-user-interaction-panel';
  userInteractionPanel.id = 'tas-user-interaction-panel';

  for (var i = 0; i < 3; i++) {
    var imgDiv = document.createElement('div');
    imgDiv.id = 'div' + i;
    var img = document.createElement('img');
    img.src = itemArray[i].url;
    imgDiv.appendChild(img);
    userInteractionPanel.appendChild(imgDiv);
  }
  userInteractionPanel.addEventListener('click', processUserSelection);
  tasUserInteractionPanelContainer.appendChild(userInteractionPanel);
}

function createCustomInteractionPanel() {
  var userInteractionPanel = document.createElement('div');
  userInteractionPanel.className = 'custom-user-interaction-panel';
  userInteractionPanel.id = 'custom-user-interaction-panel';

  for (var i = 0; i < 3; i++) {
    var imgDiv = document.createElement('div');
    imgDiv.id = 'div' + i;
    var img = document.createElement('img');
    img.src = itemArray[i].url;
    imgDiv.appendChild(img);
    userInteractionPanel.appendChild(imgDiv);
  }
  userInteractionPanel.addEventListener('click', processUserSelection);
  customUserInteractionPanelContainer.appendChild(userInteractionPanel);
}

function classicPlay() {
  while (classicTextContainer.firstChild) {
    classicTextContainer.removeChild(classicTextContainer.firstChild);
  }
  while (classicPlayButtonContainer.firstChild) {
    classicPlayButtonContainer.removeChild(classicPlayButtonContainer.firstChild);
  }
  makeGameArray(classicItemInfo);

  createClassicInteractionPanel();
}

function tasPlay() {
  while (tasTextContainer.firstChild) {
    tasTextContainer.removeChild(tasTextContainer.firstChild);
  }
  while (tasPlayButtonContainer.firstChild) {
    tasPlayButtonContainer.removeChild(tasPlayButtonContainer.firstChild);
  }
  makeGameArray(tasItemInfo);
  createTasInteractionPanel();
}

function customPlay(event) {
  event.preventDefault();
  var photo1 = event.target.photo1.value;
  var url1 = event.target.url1.value;
  var custom1 = [photo1, url1];
  var photo2 = event.target.photo2.value;
  var url2 = event.target.url2.value;
  var custom2 = [photo2, url2];
  var photo3 = event.target.photo3.value;
  var url3 = event.target.url3.value;
  var custom3 = [photo3, url3];
  customItemInfo = [custom1, custom2, custom3];

  makeGameArray(customItemInfo);

  while (customTextContainer.firstChild) {
    customTextContainer.removeChild(customTextContainer.firstChild);
  }
  while (customPlayButtonContainer.firstChild) {
    customPlayButtonContainer.removeChild(customPlayButtonContainer.firstChild);
  }
  while (customUserInteractionPanelContainer.firstChild) {
    customUserInteractionPanelContainer.removeChild(customUserInteractionPanelContainer.firstChild);
  }

  createCustomInteractionPanel();
}

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
// makeGameArray(classicItemInfo);


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
  var roundWinner = document.createElement('p');
  // roundWinner.removeAttribute('hidden');
  // var p = document.getElementById('round-message');
  if (userInput.beat === computerInput.beat) {
    roundWinner.appendChild(document.createTextNode('Tie'));
  } else if (userInput.beat === computerInput) {
    roundWinner.appendChild(document.createTextNode('Won'));
    userWins++;
  } else {
    roundWinner.appendChild(document.createTextNode('Lost'));
  }
  while (resultContainer.firstChild) {
    resultContainer.removeChild(resultContainer.firstChild);
  }
  userInteractionPanel.removeEventListener('click', processUserSelection);
  resultContainer.appendChild(roundWinner);
  resultContainer.appendChild(continueButton);
}



// console.log(oneRound(itemArray[0]));



var continueButton = document.createElement('button');
continueButton.textContent = 'Continue';
continueButton.style.margin = '5px';
continueButton.addEventListener('click', continueGame);

function continueGame() {
  userInteractionPanel.addEventListener('click', processUserSelection);
  while (resultContainer.firstChild) {
    resultContainer.removeChild(resultContainer.firstChild);
  }
}

// var userInputContainer = document.getElementById('user-input-container');
function processUserSelection(event) {
  if (rounds) {
    var clickedOnDiv = parseInt(event.target.parentNode.id.charAt(3));
    console.log('user clicked on div number ' + clickedOnDiv);
    if (!isNaN(clickedOnDiv)) {
      var userInput = itemArray[parseInt(clickedOnDiv)];
      console.log('user input is ' + userInput.name);
      oneRound(userInput);
      // reportOneRound();
      rounds--;
    }
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
  if (math >= 60) {
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



// function reportOneRound() {
//   var oneRoundReport = document.createElement('div');
//   var computerChoice = document.createElement('img');
//   computerChoice.src = 'assets/paper.jpeg';
//   var text = document.createTextNode('computer chose ');
//   oneRoundReport.appendChild(text);
//   oneRoundReport.appendChild(computerChoice);
//   while (interactionPanel.firstChild) {
//     interactionPanel.removeChild(interactionPanel.firstChild);
//   }
//   interactionPanel.appendChild(oneRoundReport);
// }
