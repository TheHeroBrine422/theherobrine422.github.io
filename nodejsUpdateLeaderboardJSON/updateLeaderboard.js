const fs = require('fs');
const Request = require('request');

var currentLeaderboardJSON = fs.readFileSync("leaderboard.json");
var currentLeaderboardJSON = JSON.parse(currentLeaderboardJSON);

var results = currentLeaderboardJSON.results // data to be inputed into json file
var total = currentLeaderboardJSON.total

var x = ""
process.argv.forEach(function (val, index, array) { // combine all command line arguments other then node and program path
  if (index == "2") {
    x = x + process.argv[index] + " "
  }
});

Request("https://api.thetheoristgateway.com/args/265048a8-8521-4e9c-84c7-1de081efe0a4/leaderboard?page="+x, function(err, res, body) {
  if (err) throw err;
  if (!err && res.statusCode == 200) { // Successful response
    var apiData = JSON.parse(body); //apidata
    if (apiData.total != undefined) {
      total = apiData.total
    }

    i2 = 0
    for (var i = x*100+1; i < x*100+101; i++) { // take data needed from leaderboard and put it in a array to be turned into json.
      if (apiData.results[i2] != undefined) {
        results[i] = apiData.results[i2].total_keys
      }
      i2++;
    }

    //console.log(results); // logging
    //console.log(x);
    //console.log(total);

    currentLeaderboardJSON.total = total
    currentLeaderboardJSON.results = results // remake leaderboard.JSON
    currentLeaderboardJSON = JSON.stringify(currentLeaderboardJSON);
//    console.log("write" + currentLeaderboardJSON);
    console.log(results.length); // debug
    fs.writeFileSync("leaderboard.json", currentLeaderboardJSON);

    if (currentLeaderboardJSON == undefined) { // if this api page doesnt work, take the last number in array and put it for all of them.
      for (var i = x*100+1; i < 100; i++) {
        results[i] = results[i-1]
      }
      currentLeaderboardJSON.results = results // remake leaderboard.json
      currentLeaderboardJSON = JSON.stringify(currentLeaderboardJSON);
      fs.writeFileSync("leaderboard.json", currentLeaderboardJSON);
    }
  }
});
