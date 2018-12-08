var count
var total
var currentTime
var startTime

process.argv.forEach(function (val, index, array) { // combine all command line arguments other then node and program path
  if (index == "2") {
    count = process.argv[index]
  } else if (index == "3") {
    total = process.argv[index]
  } else if (index == "4") {
    currentTime = process.argv[index]
  } else if (index == "5") {
    startTime = process.argv[index]
  }
});

var percent = 100*count/total
var eta1 = currentTime - startTime
var eta2 = 100/percent
var eta = eta1*eta2

process.stdout.write(String(eta.toFixed(0)));
