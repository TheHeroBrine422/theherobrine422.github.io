var count
var total
var currentTime
var startTime

count = process.argv[2]
total = process.argv[3]
currentTime = process.argv[4]
startTime = process.argv[5]

var percent = 100*count/total
var eta1 = currentTime - startTime
var eta2 = 100/percent
var eta = eta1*eta2

process.stdout.write(String(eta.toFixed(0)));
