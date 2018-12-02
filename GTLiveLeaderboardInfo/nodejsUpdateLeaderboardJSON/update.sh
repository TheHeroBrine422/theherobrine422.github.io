#!/bin/sh

SIZE=2 # smaller = bigger
clear

COUNTER=$(cat readableData.json | underscore select '.key5participants' | tr '\n' ' ' | sed -e 's/[^0-9]/ /g' -e 's/^ *//g' -e 's/ *$//g' | tr -s ' ' | sed 's/ /\n/g') # set counter to the first data page it needs to pull (first page that isnt just 5s)
COUNTER=$(($COUNTER/100))
TOTAL=$(echo $COUNTER | awk '{printf("%d\n",$0+=$0<0?-0.5:0.5)}')
COUNTER=$(($COUNTER-1))

node updateLeaderboard.js $COUNTER # get new total

TOTAL=$(cat leaderboard.json | underscore select '.total' | tr '\n' ' ' | sed -e 's/[^0-9]/ /g' -e 's/^ *//g' -e 's/ *$//g' | tr -s ' ' | sed 's/ /\n/g') # partical creadit https://stackoverflow.com/questions/17883661/how-to-extract-numbers-from-a-string
TOTAL=$(($TOTAL/100))
TOTAL=$(echo $TOTAL | awk '{printf("%d\n",$0+=$0<0?-0.5:0.5)}')
TOTAL=$(($TOTAL+1)) # pull total

COUNTERPRECENT=0 # set for percent bar counter

while [ $COUNTER -lt $TOTAL ]
do
  node updateLeaderboard.js $COUNTER # pull data
  COUNTER=$(($COUNTER+1))

  clear # clear screen (start of percent bar)
  printf "$COUNTER " # print current data page
  COUNTERPRECENT=0
  PERCENT=$(awk "BEGIN { pc=100*${COUNTER}/${TOTAL}; i=int(pc); print (pc-i<0.5)?i:i+1 }")
  PERCENT=$(($PERCENT/$SIZE))
  while [ $COUNTERPRECENT -lt $(echo $PERCENT | awk '{printf("%d\n",$0+=$0<0?-0.5:0.5)}') ]
  do
    printf "#"
    COUNTERPRECENT=$(($COUNTERPRECENT+1))
  done
  COUNTERPRECENT=0
  while [ $COUNTERPRECENT -lt $(($((100/$SIZE))-$(echo $PERCENT | awk '{printf("%d\n",$0+=$0<0?-0.5:0.5)}'))) ]
  do
    printf " "
    COUNTERPRECENT=$(($COUNTERPRECENT+1))
  done
  printf " $TOTAL $(awk "BEGIN { pc=100*${COUNTER}/${TOTAL}; i=int(pc); print (pc-i<0.5)?i:i+1 }")%%"
done

node convertIntoReadableData.js # convert the data into a readable form for the website

TIME=$(date +"%D %T") # update the data on the webserver (github)
TIMEWRITE=$(cat readableData.json | underscore extend '{time: "$TIME"}')
echo $TIMEWRITE > readableData.json
git add *
git commit -m "update data $TIME CST"
#git push