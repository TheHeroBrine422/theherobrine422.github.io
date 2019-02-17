const fs = require('fs');

var rawData = []
var chartData = {"data": []} // output file
var time = 1544205600000 // first time of first data point we have, rounded up to 3h.
var index

function main() {
  for (var i = 0; i < rawData.length; i++) {
    if (rawData[i].key9participants == undefined) {
      for (var x = 6; x < 10; x++) {
        rawData[i]["key"+x+"participants"] = 0
      }
    }
  }//10800

  while (time < ((new Date()).getTime() - (172800*1000))) {// 21600 is 24h, enough to make sure there arent data points in the future
  index = 0
  found = false
  for (var i = rawData.length-1; i > 0; i--) {
    if ((new Date(rawData[i].time)).getTime() < time && !found) {
      index = i
      found = true
    }
  }

  chartData.data[chartData.data.length] = {"time": time, "participants": rawData[index].participants, "ranking50p": rawData[index].ranking50p, "ranking25p": rawData[index].ranking25p, "ranking10p": rawData[index].ranking10p, "ranking5p": rawData[index].ranking5p, "ranking1p": rawData[index].ranking1p}
  for (var i = 1; i < 15; i++) {
    chartData.data[chartData.data.length-1]["key"+i+"participants"] = rawData[index]["key"+i+"participants"]
  }

  time = time + 86400*1000 // 24h, resolution of graph
  }
  fs.writeFileSync("chart.json", JSON.stringify(chartData)); // write result
}

fs.readdir('./versions/', (err, files) => { // read versions
  files.forEach(file => {
    rawData[rawData.length] = JSON.parse(fs.readFileSync("./versions/"+file))
  });
  main()
})
