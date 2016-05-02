var itemArray = new Array(3);
var classicItemInfo = [['rock', '../assets/rock.jpeg'],
                ['paper', '../assets/paper.jpeg'],
                ['scissor', '../assets/scissors_PNG25.png']];

var taItemInfo = [];
var customItemInfo;

function RPSItem(name, url) {
  this.name = name;
  this.url = url;
  this.beat = null;
}

RPSItem.prototype.setBeat = function(other) {
  this.beat = other;
};

function makeGameArray(inputInfo){
  for(var i = 0; i < inputInfo.length; i++){
    var item = new RPSItem(inputInfo[i][0], inputInfo[i][1]);
    itemArray[i] = item;
  }
  itemArray[0].setBeat(itemArray[itemArray.length - 1]);
  itemArray[1].setBeat(itemArray[0]);
  itemArray[2].setBeat(itemArray[1]);
}
makeGameArray(classicItemInfo);
//generate random number for computer choice
