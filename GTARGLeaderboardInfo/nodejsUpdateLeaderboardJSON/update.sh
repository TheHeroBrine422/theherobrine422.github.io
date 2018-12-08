#!/bin/sh

SIZE=1 # smaller = bigger minimum 1
clear

COUNTER=$(cat readableData.json | underscore select '.key5participants' | tr '\n' ' ' | sed -e 's/[^0-9]/ /g' -e 's/^ *//g' -e 's/ *$//g' | tr -s ' ' | sed 's/ /\n/g') # set counter to the first data page it needs to pull (first page that isnt just 5s)
COUNTER=$(($COUNTER/100))
TOTAL=$(echo $COUNTER | awk '{printf("%d\n",$0+=$0<0?-0.5:0.5)}')
COUNTER=$(($COUNTER-1))
OGCOUNT=$COUNTER

node updateLeaderboard.js $COUNTER # get new total

TOTAL=$(cat leaderboard.json | underscore select '.total' | tr '\n' ' ' | sed -e 's/[^0-9]/ /g' -e 's/^ *//g' -e 's/ *$//g' | tr -s ' ' | sed 's/ /\n/g') # partical creadit https://stackoverflow.com/questions/17883661/how-to-extract-numbers-from-a-string
TOTAL=$(($TOTAL/100))
TOTAL=$(echo $TOTAL | awk '{printf("%d\n",$0+=$0<0?-0.5:0.5)}')
TOTAL=$(($TOTAL+1)) # pull total

COUNTERPRECENT=0 # set for percent bar counter
STARTTIME=$(date +"%s")
while [ $COUNTER -lt $TOTAL ]
do
  node updateLeaderboard.js $COUNTER # pull data
  COUNTER=$(($COUNTER+1))
  ACTUALCOUNT=$(($COUNTER-$OGCOUNT))
  ACTUALTOTAL=$(($TOTAL-$OGCOUNT))
  clear # clear screen (start of percent bar)
  printf "$ACTUALCOUNT " # print current data page
  COUNTERPRECENT=0
  PERCENT=$(awk "BEGIN { pc=100*${ACTUALCOUNT}/${ACTUALTOTAL}; i=int(pc); print (pc-i<0.5)?i:i+1 }")
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
  PERCENT=$((100*$ACTUALCOUNT/$ACTUALTOTAL))
  if [ $PERCENT -eq 0 ]; then
    PERCENT=1
  fi
  ETA=$((100/$PERCENT)) # TOTAL calculation, just forcing pemdas: ($(date +'%s')-$STARTTIME)*(100/$PERCENT)
  ETAT=$(($(date +'%s')-$STARTTIME)) # ETA 2
  ETA=$(($ETAT*$ETA))
  PERCENT=$(awk "BEGIN { pc=100*${ACTUALCOUNT}/${ACTUALTOTAL}; i=int(pc); print (pc-i<0.5)?i:i+1 }")
  printf " $(($ACTUALTOTAL)) $PERCENT%%       $(($(date +'%s')-$STARTTIME)) seconds out of a estimated $ETA seconds"
done

node convertIntoReadableData.js # convert the data into a readable form for the website

TIME=$(date +"%D %T") # update the data on the webserver (github)
TIMEWRITE=$(cat readableData.json | underscore extend "{time: '$TIME'}")
echo $TIMEWRITE > readableData.json

echo pushing to github
git add *
git commit -m "update data $TIME CST"
git push
