var round = 1
var players = {"count":1, "data":[[0, 0, "Player 1"], [0, 0, "Player 2"]]} // player array = [phase (number), score (number), name (string)]
var dealers = false
var buttons = true
var saveData = JSON.parse(localStorage.saveData || null) || {};
var customrows = 0

Element.prototype.remove = function() { // credit https://stackoverflow.com/questions/3387427/remove-element-by-id#18120786
  this.parentElement.removeChild(this);
}

String.prototype.isNumber = function(){return /^\d+$/.test(this);} // credit https://stackoverflow.com/a/1780055/5038158

function addPhase(player) { // simply add 1 to phase counter for player
  players.data[player][0] = players.data[player][0] + 1
}

function updateScore() {
  if (buttons) {
    document.getElementById("addplayerbutton").remove()
    document.getElementById("removeplayerbutton").remove()
    document.getElementById("addcustomcolummbutton").remove()
    document.getElementById("removecustomcolummbutton").remove()
    buttons = false
  }

  for (var i = 0; i <= players.count; i++) { // start for loop of all of the players
    scoreAdd = document.getElementById("ScoreP"+(i + 1)+"inside").innerHTML // get the score to add
    test = Number(players.data[i][1]) + Number(scoreAdd) // set that number up for a test

    players.data[i][2] =  document.getElementById("p" + (i + 1) + "name").innerHTML // update player name

    if (String(test).isNumber()) { // test if the number actually is a number
      players.data[i][1] = Number(players.data[i][1]) + Number(scoreAdd) // set the offical player score to the tested number
      document.getElementById("err").innerHTML = "" // set err to nothing
    } else {
      document.getElementById("err").innerHTML = "Error: Score to add is not a number" // if the number isnt a number givve a err msg
      document.getElementById("err").style.color = "red"
      return
    }

    document.getElementById("ScoreP"+(i + 1)+"inside").innerHTML = "" // reset player's add boxto empty
    document.getElementById("r"+round+"p"+(i + 1)+"score").innerHTML = players.data[i][1] // set the round box to the player score
    document.getElementById("r"+round+"p"+(i + 1)+"phase").innerHTML = players.data[i][0]
  }

  if (dealers == true) { // check if user is using dealer teller or not
    document.getElementById("r"+round+"dealer").innerHTML = document.getElementById(((((round+players.count)%(players.count+1))+1))+"dealer").innerHTML // current round dealer (really only needed for round 1)
    document.getElementById("r"+(round+1)+"dealer").innerHTML = document.getElementById((((((round+1)+players.count)%(players.count+1))+1))+"dealer").innerHTML // next round dealer
  } else {
    document.getElementById("err").innerHTML = "Warning: Dealer Order not set."
    document.getElementById("err").style.color = "Orange"
  }

  round = round + 1 // increment round

  if (round > 1) {  // add the next line/round for adding data later
    document.getElementById("scorecard").innerHTML = document.getElementById("scorecard").innerHTML + '<tr id="round'+ String(Number(round+1)) + '">'
    document.getElementById("round" + String(Number(round+1))).innerHTML = document.getElementById("round" + String(Number(round+1))).innerHTML + '<td>' + String(Number(round+1)) + '</td>'
    document.getElementById("round" + String(Number(round+1))).innerHTML = document.getElementById("round" + String(Number(round+1))).innerHTML + '<td id="r' + String(Number(round+1)) + 'dealer"></td>'
    for (var i = 0; i <= players.count; i++) {
      document.getElementById("round" + String(Number(round+1))).innerHTML = document.getElementById("round" + String(Number(round+1))).innerHTML + '<td id="r' + String(Number(round+1)) + 'p' + (i + 1) + 'score"></td>'
      document.getElementById("round" + String(Number(round+1))).innerHTML = document.getElementById("round" + String(Number(round+1))).innerHTML + '<td id="r' + String(Number(round+1)) + 'p' + (i + 1) + 'phase"></td>'
    }
  }
  document.getElementById("round").innerHTML = "Current round: " + round // set current round

  saveData.scorecard = document.getElementById("scorecard").innerHTML
  saveData.round = round
  localStorage.saveData = JSON.stringify(saveData)
}

function undoRound() {
  if (round <= 1) { // check if they try to go to round 0 or less
    document.getElementById("err").innerHTML = "Error: Can not make round number less then 1"
    document.getElementById("err").style.color = "Red"
  } else { // main code for undoRound()
    for (var i = 0; i <= players.count; i++) { // start for loop of all of the players
       // update player name
      if ((round-2) > 0) {
        if (document.getElementById("r"+(round-2)+"p"+(i + 1)+"phase").innerHTML == "") {
          players.data[i][0] = 0
        } else {
          players.data[i][0] = document.getElementById("r"+(round-2)+"p"+(i + 1)+"phase").innerHTML
        }
        players.data[i][1] = document.getElementById("r"+(round-2)+"p"+(i + 1)+"score").innerHTML
      } else {
        players.data[i][0] = 0
        players.data[i][1] = 0
      }
      document.getElementById("r"+(round - 1)+"p"+(i + 1)+"score").innerHTML = ""
      document.getElementById("r"+(round - 1)+"p"+(i + 1)+"phase").innerHTML = ""
    }
    document.getElementById("round"+(round + 1)).remove()

    round = round - 1

    document.getElementById("round").innerHTML = "Current round: " + round
  }
}

function addPlayer() {
  if (players.count > 4) { // check if theres going to be 7+ players
    document.getElementById("err").innerHTML = "Warning: Phase 10 does not normally allow for more then 6 people, you may need to combine multiple decks together or some kind of special house rules for this many players." // set a warning
    document.getElementById("err").style.color = "Orange"
  }
  players.count = players.count + 1 // increment player count
  players.data[players.count] = [0,0] // set data for new player

  document.getElementById("playernames").innerHTML = document.getElementById("playernames").innerHTML + '<th colspan="2" id="p' + (players.count + 1) + 'nameouter"><div contenteditable id="p' + (players.count + 1) + 'name">Player ' + (players.count + 1) + '</div></th>' // add the colums/data for the new player
  document.getElementById("titles").innerHTML = document.getElementById("titles").innerHTML + '<td id="p' + (players.count + 1) + 'score">Score</td>'
  document.getElementById("titles").innerHTML = document.getElementById("titles").innerHTML + '<td id="p' + (players.count + 1) + 'phase">Completed Phase</td>'
  document.getElementById("add").innerHTML = document.getElementById("add").innerHTML + '<td id="ScoreP' + (players.count + 1) + '"><div contenteditable id="ScoreP' + (players.count + 1) + 'inside"></div></td>'
  document.getElementById("add").innerHTML = document.getElementById("add").innerHTML + '<td id="ButtonP' + (players.count + 1) + '"><button type="button" onclick="addPhase(' + players.count + ')">Add 1 Phase</button></td>'
  document.getElementById("round1").innerHTML = document.getElementById("round1").innerHTML + '<td id="r1p' + (players.count + 1) + 'score"></td>'
  document.getElementById("round1").innerHTML = document.getElementById("round1").innerHTML + '<td id="r1p' + (players.count + 1) + 'phase"></td>'
  document.getElementById("round2").innerHTML = document.getElementById("round2").innerHTML + '<td id="r2p' + (players.count + 1) + 'score"></td>'
  document.getElementById("round2").innerHTML = document.getElementById("round2").innerHTML + '<td id="r2p' + (players.count + 1) + 'phase"></td>'
  document.getElementById("dealer").innerHTML = document.getElementById("dealer").innerHTML + '<tr id="' + (players.count + 1) + 'dealerrow">'
  document.getElementById((players.count + 1) + "dealerrow").innerHTML = '<td><div id="' + (players.count + 1) + 'dealer" contenteditable></div></td>'
}

function removePlayer() {
  if (players.count > 1) { // check if theres going to be less then 2 players and if so set a err
    players.count = players.count - 1
    if (players.count < 6) { // check if there are less then 7 and remove a potenial warning
      document.getElementById("err").innerHTML = ""
    }
    document.getElementById("p" + (players.count + 2) + "nameouter").remove() // remove data/columms for old player
    document.getElementById("p" + (players.count + 2) + "score").remove()
    document.getElementById("p" + (players.count + 2) + "phase").remove()
    document.getElementById("ScoreP" + (players.count + 2)).remove()
    document.getElementById("ButtonP" + (players.count + 2)).remove()
    document.getElementById("r1p" + (players.count + 2) + "score").remove()
    document.getElementById("r1p" + (players.count + 2) + "phase").remove()
    document.getElementById("r2p" + (players.count + 2) + "score").remove()
    document.getElementById("r2p" + (players.count + 2) + "phase").remove()
    document.getElementById((players.count + 2) + "dealerrow").remove()
  } else {
    document.getElementById("err").innerHTML = "Error: Number of players can not be lower then 2"
    document.getElementById("err").style.color = "red"
  }
}

function updateDealerOrder() {
  dealers = true

  for (var i = 0; i <= players.count; i++) { // update names for players
    players.data[i][2] =  document.getElementById("p" + (i + 1) + "name").innerHTML
  }

  for (var i = 0; i <= players.count; i++) { // for loop through the dealer order table
    if (document.getElementById((i + 1) + "dealer").innerHTML != "") { // check if there is a value in the box
      document.getElementById((i + 1) + "dealer").innerHTML = players.data[document.getElementById((i + 1) + "dealer").innerHTML-1][2]
    } else {
      document.getElementById("err").innerHTML = "Error: a value in the Dealer Order is not filled" // if there is no value, set a err and break out of the loop
      document.getElementById("err").style.color = "red"
      dealers = false
      break
    }
  }

  saveData.dealer = document.getElementById("dealer").innerHTML // localStorage save
  localStorage.saveData = JSON.stringify(saveData)
}

function reload() {
  var saveData = JSON.parse(localStorage.saveData || null) || {};
  if (buttons) {
    document.getElementById("addplayerbutton").remove()
    document.getElementById("removeplayerbutton").remove()
    buttons = false
  }
  document.getElementById("dealer").innerHTML = saveData.dealer
  document.getElementById("scorecard").innerHTML = saveData.scorecard
  round = saveData.round
}

function addCustomColumm() {
  customrows = customrows + 1

  for (var i = 0; i <= players.count; i++) { // update names for players
    players.data[i][2] =  document.getElementById("p" + (i + 1) + "name").innerHTML
  }

  for (var i = 0; i <= players.count; i++) {
    document.getElementById("p"+(i+1)+"nameouter").remove()
    document.getElementById("playernames").innerHTML = document.getElementById("playernames").innerHTML + '<th colspan="' + (customrows + 2) + '" id="p' + (i + 1) + 'nameouter"><div contenteditable="" id="p' + (i + 1) + 'name">' + players.data[i][2] + '</div></th>'
  }
  titles = document.getElementById("titles").innerHTML.split("\n")
  for (var i = 0; i <= players.count; i++) {
    console.log(titles)
    if (i < players.count-1) {
      titles[((i+1)*3)+5] = titles[((i+1)*3)+4]
      titles[((i+1)*3)+4] = titles[((i+1)*3)+3]
    }
    titles[(i*4)+5] = "<td><div contenteditable>Custom Row</div></td>"
  }
  /*titles[8] = titles[7]
  titles[7] = titles[6]
  titles[5] = "<td><div contenteditable>Custom Row</div></td>"
  titles[9] = "<td><div contenteditable>Custom Row</div></td>"*/
  titlesstring = ""
  for (var i = 0; i < titles.length; i++) {
    titlesstring = titlesstring + titles[i] + "\n"
  }
  document.getElementById("titles").innerHTML = titlesstring
  console.log(titlesstring)
}

function removeCustomColumm() {
  if (customrows > 0) {
    customrows = customrows - 1

    for (var i = 0; i <= players.count; i++) { // update names for players
      players.data[i][2] =  document.getElementById("p" + (i + 1) + "name").innerHTML
    }

    for (var i = 0; i <= players.count; i++) {
      document.getElementById("p"+(i+1)+"nameouter").remove()
      document.getElementById("playernames").innerHTML = document.getElementById("playernames").innerHTML + '<th colspan="' + (customrows + 2) + '" id="p' + (i + 1) + 'nameouter"><div contenteditable="" id="p' + (i + 1) + 'name">' + players.data[i][2] + '</div></th>'
    }
  } else {
    document.getElementById("err").innerHTML = "Error: Can't remove a columm that isnt there."
    document.getElementById("err").style.color = "red"
  }
}
