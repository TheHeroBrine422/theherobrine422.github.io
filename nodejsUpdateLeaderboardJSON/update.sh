#!/bin/sh

SIZE=2 # smaller = bigger

COUNTER=$(cat readableData.json | underscore select '.key5participants' | tr '\n' ' ' | sed -e 's/[^0-9]/ /g' -e 's/^ *//g' -e 's/ *$//g' | tr -s ' ' | sed 's/ /\n/g'
) # update leaderboard.js
node updateLeaderboard.js $COUNTER
TOTAL=$(cat leaderboard.json | underscore select '.total' | tr '\n' ' ' | sed -e 's/[^0-9]/ /g' -e 's/^ *//g' -e 's/ *$//g' | tr -s ' ' | sed 's/ /\n/g'
) # partical creadit https://stackoverflow.com/questions/17883661/how-to-extract-numbers-from-a-string
TOTAL=$(($TOTAL/100))
TOTAL=$(echo $TOTAL | awk '{printf("%d\n",$0+=$0<0?-0.5:0.5)}')
TOTAL=$(($TOTAL+1))
COUNTER=$(($COUNTER+1))
COUNTERPRECENT=0
while [ $COUNTER -lt $TOTAL ]
do
  node updateLeaderboard.js $COUNTER
  COUNTER=$(($COUNTER+1))
  clear
  printf "$COUNTER "
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
git add *
git commit -m "update data $TIME CST"
# git push
