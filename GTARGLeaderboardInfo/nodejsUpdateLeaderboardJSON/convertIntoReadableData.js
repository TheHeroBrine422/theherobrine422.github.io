const fs = require('fs');

var currentLeaderboardJSON = JSON.parse(fs.readFileSync("leaderboard.json"))

var readableData = JSON.parse(fs.readFileSync("readableData.json"))

readableData.participants = currentLeaderboardJSON.total
readableData.key14participants = currentLeaderboardJSON.results.indexOf(13)-1
readableData.key13participants = currentLeaderboardJSON.results.indexOf(12)-1
readableData.key12participants = currentLeaderboardJSON.results.indexOf(11)-1
readableData.key11participants = currentLeaderboardJSON.results.indexOf(10)-1
readableData.key10participants = currentLeaderboardJSON.results.indexOf(9)-1
readableData.key9participants = currentLeaderboardJSON.results.indexOf(8)-1
readableData.key8participants = currentLeaderboardJSON.results.indexOf(7)-1
readableData.key7participants = currentLeaderboardJSON.results.indexOf(6)-1
readableData.key6participants = currentLeaderboardJSON.results.indexOf(5)-1
readableData.key5participants = currentLeaderboardJSON.results.indexOf(4)-1
readableData.key4participants = currentLeaderboardJSON.results.indexOf(3)-1
readableData.key3participants = currentLeaderboardJSON.results.indexOf(2)-1
readableData.key2participants = currentLeaderboardJSON.results.indexOf(1)-1
readableData.key1participants = currentLeaderboardJSON.results.indexOf(0)-1
readableData.ranking50p = (currentLeaderboardJSON.total/2).toFixed(0)
readableData.ranking25p = (currentLeaderboardJSON.total/4).toFixed(0)
readableData.ranking10p = (currentLeaderboardJSON.total/10).toFixed(0)
readableData.ranking5p = (currentLeaderboardJSON.total/20).toFixed(0)
readableData.ranking1p = (currentLeaderboardJSON.total/100).toFixed(0)

fs.writeFileSync("readableData.json", JSON.stringify(readableData));
