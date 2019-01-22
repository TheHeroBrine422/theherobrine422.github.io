var percent = 100*process.argv[2]/process.argv[3]
var eta1 = process.argv[4] - process.argv[5]
var eta2 = 100/percent
var eta = eta1*eta2

process.stdout.write(String(eta.toFixed(0)));
