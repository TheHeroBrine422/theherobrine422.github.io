const fs = require('fs');

var currentLeaderboardJSON = fs.readFileSync("leaderboard.json");
var currentLeaderboardJSON = JSON.parse(currentLeaderboardJSON);

var results = currentLeaderboardJSON.results // data to be inputed into json file
var total = currentLeaderboardJSON.total

var readableData = fs.readFileSync("readableData.json");
var readableData = JSON.parse(readableData);

readableData.participants = total
readableData.key5participants = currentLeaderboardJSON.results.indexOf(4)-1
readableData.key4participants = currentLeaderboardJSON.results.indexOf(3)-1
readableData.key3participants = currentLeaderboardJSON.results.indexOf(2)-1
readableData.key2participants = currentLeaderboardJSON.results.indexOf(1)-1
readableData.key1participants = currentLeaderboardJSON.results.indexOf(0)- 1
readableData.ranking50p = (total/2).toFixed(0)
readableData.ranking25p = (total/4).toFixed(0)
readableData.ranking10p = (total/10).toFixed(0)
readableData.ranking5p = (total/20).toFixed(0)
readableData.ranking1p = (total/100).toFixed(0)

console.log(readableData);
