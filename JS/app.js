var itemArray = new Array(3);
var classicItemInfo = [['rock', '../assets/rock.jpeg'],
                ['paper', '../assets/paper.jpeg'],
                ['scissor', '../assets/scissor.png']];

var taItemInfo = [];
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
makeGameArray(classicItemInfo);

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

var userInteractionPanel = document.getElementById('classic-user-interaction-panel');

var resultContainer = document.getElementById('classic-round-result-container');

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
userInteractionPanel.addEventListener('click', processUserSelection);

function processUserSelection(event) {
  if (rounds) {
    var clickedOnDiv = parseInt(event.target.parentNode.id);
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
