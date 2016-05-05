// TODO: PLAY AGAIN BUTTON, return other sections to their original state when pressing on other play buttons in other sections


var newUser;
var allUsersArray = [];
var scoreTable = document.getElementById('score-table');

//getting info from the local storage
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
var classicItemInfo = [['rock', 'assets/rock.png'],
                ['paper', 'assets/paper.jpeg'],
                ['scissor', 'assets/scissor.png']];

var tasItemInfo = [['Dan', 'assets/Dan.png'],
                ['Jonathan', 'assets/Jonathan.jpeg'],
                ['Katie', 'assets/katie.jpeg']];

var customItemInfo = [];

var userWins = 0;
var rounds = 0;
var initialNumberOfRound = 0;

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

var customInputFormContainer = document.getElementById('custom-form-container');

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
  form.className = 'bo-selector-form';

  for (var i = 0; i < 4; i++) {
    var fieldSet = document.createElement('fieldset');
    var input = document.createElement('input');
    input.name = 'numbers';
    input.type = 'radio';
    if (i === 0) {
      input.value = 1;
      input.id = 'bo1';
    } else if (i === 1) {
      input.value = 3;
      input.id = 'bo3';
    } else if (i === 2) {
      input.value = 5;
      input.id = 'bo5';
    } else if (i === 3) {
      input.value = 7;
      input.id = 'bo7';
    }
    // input.textContent = i;
    fieldSet.appendChild(input);
    var label = document.createElement('label');

    if (i === 0) {
      label.setAttribute('for', 'bo1');
      label.textContent = 1;
    } else if (i === 1) {
      label.setAttribute('for', 'bo3');
      label.textContent = 3;
    } else if (i === 2) {
      label.setAttribute('for', 'bo5');
      label.textContent = 5;
    } else if (i === 3) {
      label.setAttribute('for', 'bo7');
      label.textContent = 7;
    }

    fieldSet.appendChild(label);
    form.appendChild(fieldSet);
  }
  boSelectorContainer.appendChild(form);

  boSelectorContainer.addEventListener('click', setBestOf);
  userWins = 0;
  rounds = 0;
  initialNumberOfRound = 0;
}

function setBestOf(event) {
  console.log(event.target.value);
  if(!isNaN(Number.parseInt(event.target.value))) {
    var gameResetMessage = document.createElement('p');
    gameResetMessage.textContent = 'New Game Started!';
    while (resultContainer.firstChild) {
      resultContainer.removeChild(resultContainer.firstChild);
    }
    resultContainer.appendChild(gameResetMessage);
    userWins = 0;
    rounds = Number.parseInt(event.target.value);
    initialNumberOfRound = Number.parseInt(event.target.value);
  }
}

function createInteractionPanel(section) {
  var tempInteractionPanel = document.createElement('div');
  tempInteractionPanel.className = section + '-user-interaction-panel';
  tempInteractionPanel.id = section + '-user-interaction-panel';

  for (var i = 0; i < 3; i++) {
    var imgDiv = document.createElement('div');
    imgDiv.id = 'div' + i;
    var img = document.createElement('img');
    img.src = itemArray[i].url;
    imgDiv.appendChild(img);
    tempInteractionPanel.appendChild(imgDiv);
  }
  tempInteractionPanel.addEventListener('click', processUserSelection);

  createBestOfSelector(section);
  return tempInteractionPanel;
}

function classicPlay() {
  while (classicTextContainer.firstChild) {
    classicTextContainer.removeChild(classicTextContainer.firstChild);
  }
  while (classicPlayButtonContainer.firstChild) {
    classicPlayButtonContainer.removeChild(classicPlayButtonContainer.firstChild);
  }
  makeGameArray(classicItemInfo);
  // createClassicInteractionPanel();
  classicUserInteractionPanelContainer.appendChild(createInteractionPanel('classic'));
  // userWins = 0;
  // rounds = 7;

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
  tasUserInteractionPanelContainer.appendChild(createInteractionPanel('tas'));
  // createTasInteractionPanel();
  // userWins = 0;
  // rounds = 7;

  userInteractionPanel = tasUserInteractionPanelContainer;
  resultContainer = document.getElementById('tas-round-result-container');
}

function customPlay() {
  while (customTextContainer.firstChild) {
    customTextContainer.removeChild(customTextContainer.firstChild);
  }
  while (customPlayButtonContainer.firstChild) {
    customPlayButtonContainer.removeChild(customPlayButtonContainer.firstChild);
  }
  while (customUserInteractionPanelContainer.firstChild) {
    customUserInteractionPanelContainer.removeChild(customUserInteractionPanelContainer.firstChild);
  }

  createCustomInputForm();

}

function createCustomInputForm() {
  var customForm = document.createElement('form');
  for (var i = 1; i < 4; i++) {
    var fieldSet = document.createElement('fieldset');
    var label1 = document.createElement('label')
    label1.textContent = 'Enter Image Name';
    label1.setAttribute('for', ('photo' + i));

    var input1 = document.createElement('input');
    input1.name = 'photo' + i;
    input1.id = 'photo' + i;
    input1.type = 'text';

    fieldSet.appendChild(label1);
    fieldSet.appendChild(input1);

    var label2 = document.createElement('label')
    label2.textContent = 'Enter Image URL';
    label2.setAttribute('for', ('url' + i));
    var input2 = document.createElement('input');
    input2.name = 'url' + i;
    input2.id = 'url' + i;
    input2.type = 'text';

    fieldSet.appendChild(label2);
    fieldSet.appendChild(input2);

    customForm.appendChild(fieldSet);
  }


  var submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.id = 'submit-custom-form';
  submitButton.textContent = 'Submit';
  customForm.appendChild(submitButton);
  customForm.addEventListener('submit', processCustomForm);
  console.log(customForm);
  customUserInteractionPanelContainer.appendChild(customForm);
}


function processCustomForm(event) {
  event.preventDefault();
  console.log('hello');
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


  while (customTextContainer.firstChild) {
    customTextContainer.removeChild(customTextContainer.firstChild);
  }
  while (customPlayButtonContainer.firstChild) {
    customPlayButtonContainer.removeChild(customPlayButtonContainer.firstChild);
  }
  while (customUserInteractionPanelContainer.firstChild) {
    customUserInteractionPanelContainer.removeChild(customUserInteractionPanelContainer.firstChild);
  }

  makeGameArray(customItemInfo);

  customUserInteractionPanelContainer.appendChild(createInteractionPanel('custom'));

  userInteractionPanel = customUserInteractionPanelContainer;
  resultContainer = document.getElementById('custom-round-result-container');

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
  resultContainer.appendChild(roundWinner);
}

function processUserSelection(event) {
  if (initialNumberOfRound === 0) {
    alert('select a bo');
    return;
  }

  if (rounds) {
    var clickedOnDiv = parseInt(event.target.parentNode.id.charAt(3));
    console.log('user clicked on div number ' + clickedOnDiv);
    if (!isNaN(clickedOnDiv)) {
      var userInput = itemArray[parseInt(clickedOnDiv)];
      console.log('user input is ' + userInput.name);
      oneRound(userInput);
      rounds--;
    }
    if (rounds == 0) {
      displayResult();
    }
  }
}

function displayResult() {
  var math = (userWins / initialNumberOfRound) * 100;
  var p = document.createElement('p');
  if (math >= 50) {
    p.textContent = 'Congratulations! You are the winner!';
    console.log('done');
    console.log('You\'ve won ' + userWins + ' out of ' + initialNumberOfRound);
  } else {
    p.textContent = 'You lost! Won ' + userWins + ' out of ' + initialNumberOfRound;
    console.log('done');
    console.log('You lost ' + userWins + ' out of ' + initialNumberOfRound + '!');
  }
  var buttonDisplay = document.createElement('div');
  buttonDisplay.id = 'button-display';
  var button1 = document.createElement('button');
  button1.id = 'button1';
  button1.textContent = 'Play again';
  var button2 = document.createElement('button');
  button2.id = 'button2';
  button2.textContent = 'Leader Board';
  var button3 = document.createElement('button');
  button3.id = 'button3';
  button3.textContent = 'Clear Leader Board';

  resultContainer.appendChild(p);
  buttonDisplay.appendChild(button1);
  buttonDisplay.appendChild(button2);
  buttonDisplay.appendChild(button3);
  resultContainer.appendChild(buttonDisplay);

  var button2response = document.getElementById('button2');
  button2response.addEventListener('click', renderScore);

  var button3response = document.getElementById('button3');
  button3response.addEventListener('click', function(){
    localStorage.clear();
    scoreTable.textContent = '';
  });
}
//TATIANA'S addEventListenerfunction displayResult()

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

// var userProfile = [];
//rendering scores

function sortAllUserArray(objectArray){
  function byUserScore(a, b) {
    return parseInt(b.userScore) - parseInt(a.userScore);
  };
  return objectArray.sort(byUserScore);
}

function renderScore() {
  if(scoreTable.textContent === ''){
    var highScore = parseInt(userWins * 1000 / initialNumberOfRound);
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
      window.location.href = '#score-table';
    }
  }
}
