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

var userInteractionPanel;
var resultContainer;

function createBestOfSelector(section) {
  var boSelectorContainer = document.getElementById(section + '-bo-selector-container');

  var header = document.createElement('h1');
  header.textContent = 'Best Of';
  boSelectorContainer.appendChild(header);

  var form = document.createElement('form');
  form.className = "bo-selector-form";

  for (var i = 0; i < 4; i++) {
    var fieldSet = document.createElement('fieldset');
    var input = document.createElement('input');
    input.name = 'numbers';
    input.type = 'radio';
    input.value = i;
    input.id = 'bo' + i;
    // input.textContent = i;
    fieldSet.appendChild(input);
    var label = document.createElement('label');
    label.setAttribute('for', ('bo' + i));
    label.textContent = i;
    fieldSet.appendChild(label);
    form.appendChild(fieldSet);
  }
  boSelectorContainer.appendChild(form);
}

function createClassicInteractionPanel() {
  var tempInteractionPanel = document.createElement('div');
  tempInteractionPanel.className = 'classic-user-interaction-panel';
  tempInteractionPanel.id = 'classic-user-interaction-panel';

  for (var i = 0; i < 3; i++) {
    var imgDiv = document.createElement('div');
    imgDiv.id = 'div' + i;
    var img = document.createElement('img');
    img.src = itemArray[i].url;
    imgDiv.appendChild(img);
    tempInteractionPanel.appendChild(imgDiv);
  }

  tempInteractionPanel.addEventListener('click', processUserSelection);
  classicUserInteractionPanelContainer.appendChild(tempInteractionPanel);
  createBestOfSelector('classic');
}

function createTasInteractionPanel() {
  var tempInteractionPanel = document.createElement('div');
  tempInteractionPanel.className = 'tas-user-interaction-panel';
  tempInteractionPanel.id = 'tas-user-interaction-panel';

  for (var i = 0; i < 3; i++) {
    var imgDiv = document.createElement('div');
    imgDiv.id = 'div' + i;
    var img = document.createElement('img');
    img.src = itemArray[i].url;
    imgDiv.appendChild(img);
    tempInteractionPanel.appendChild(imgDiv);
  }
  tempInteractionPanel.addEventListener('click', processUserSelection);
  tasUserInteractionPanelContainer.appendChild(tempInteractionPanel);
  createBestOfSelector('tas');
}

function createCustomInteractionPanel() {
  var tempInteractionPanel = document.createElement('div');
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
  tempInteractionPanel.addEventListener('click', processUserSelection);
  customUserInteractionPanelContainer.appendChild(tempInteractionPanel);
  createBestOfSelector('custom');
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
  userWins = 0;
  rounds = 7;

  userInteractionPanel = classicUserInteractionPanelContainer;
  resultContainer = document.getElementById('classic-round-result-container');
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
  userWins = 0;
  rounds = 7;

  userInteractionPanel = tasUserInteractionPanelContainer;
  resultContainer = document.getElementById('tas-round-result-container');
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function oneRound(userInput) {
  var computerInput = itemArray[getRandomInt(itemArray.length)];
  console.log('comp input is ' + computerInput.name);
  var roundWinner = document.createElement('p');

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
  // userInteractionPanel.removeEventListener('click', processUserSelection);
  resultContainer.appendChild(roundWinner);
  // resultContainer.appendChild(continueButton);
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
      // while (resultContainer.firstChild) {
      //   resultContainer.removeChild(resultContainer.firstChild);
      // }
      displayResult();
    }
  }
}

function displayResult() {
  var math = (userWins / initialNumberOfRounds) * 100;
  var p = document.createElement('p');
  if (math >= 50) {
    p.textContent = 'Congratulations! You are the winner!';
    console.log('done');
    console.log('You\'ve won ' + userWins + ' out of ' + initialNumberOfRounds);
  } else {
    p.textContent = 'You lost! Won ' + userWins + ' out of ' + initialNumberOfRounds;
    console.log('done');
    console.log('You lost ' + userWins + ' out of ' + initialNumberOfRounds + '!');
  }
  resultContainer.appendChild(p);

  // var math = (userWins / initialNumberOfRounds) * 100;
  // var gameWinner = document.getElementById('game-winner');
  // var roundWinner = document.getElementById('round-winner');
  // var interactionPanel = document.getElementById('interaction-panel');
  // gameWinner.removeAttribute('hidden');
  // roundWinner.setAttribute('hidden', 'hidden');
  // interactionPanel.setAttribute('hidden', 'hidden');
  // var p = document.getElementById('game-message');
  // if (math >= 50) {
  //   p.textContent = 'Congratulations! You are the winner!';
  //   console.log('done');
  //   console.log('You\'ve won ' + userWins + ' out of ' + initialNumberOfRounds);
  // } else {
  //   p.textContent = 'You lost!';
  //   console.log('done');
  //   console.log('You lost ' + userWins + ' out of ' + initialNumberOfRounds + '!');
  // }
  // var buttonDisplay = document.getElementById('button-display');
  // buttonDisplay.removeAttribute('hidden');
}
