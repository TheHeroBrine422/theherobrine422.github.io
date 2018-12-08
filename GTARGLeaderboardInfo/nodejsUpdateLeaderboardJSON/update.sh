#!/bin/sh

clear

COUNTER=$(cat readableData.json | underscore select '.key5participants' | tr '\n' ' ' | sed -e 's/[^0-9]/ /g' -e 's/^ *//g' -e 's/ *$//g' | tr -s ' ' | sed 's/ /\n/g') # set counter to the first data page it needs to pull (first page that isnt just 5s)
COUNTER=$(($COUNTER/100))
TOTAL=$(echo $COUNTER | awk '{printf("%d\n",$0+=$0<0?-0.5:0.5)}')
COUNTER=$(($COUNTER-1))
OGCOUNT=$COUNTER

#node updateLeaderboard.js $COUNTER # get new total

TOTAL=$(cat leaderboard.json | underscore select '.total' | tr '\n' ' ' | sed -e 's/[^0-9]/ /g' -e 's/^ *//g' -e 's/ *$//g' | tr -s ' ' | sed 's/ /\n/g') # partical creadit https://stackoverflow.com/questions/17883661/how-to-extract-numbers-from-a-string
TOTAL=$(($TOTAL/100))
TOTAL=$(echo $TOTAL | awk '{printf("%d\n",$0+=$0<0?-0.5:0.5)}')
TOTAL=$(($TOTAL+1)) # pull total

COUNTERPRECENT=0 # set for percent bar counter
STARTTIME=$(date +"%s")
while [ $COUNTER -lt $TOTAL ]
do
  #node updateLeaderboard.js $COUNTER # pull data
  COUNTER=$(($COUNTER+1))
  ACTUALCOUNT=$(($COUNTER-$OGCOUNT))
  ACTUALTOTAL=$(($TOTAL-$OGCOUNT))
  printf "$ACTUALCOUNT /" # print current data page
  PERCENT=$(awk "BEGIN { pc=100*${ACTUALCOUNT}/${ACTUALTOTAL}; i=int(pc); print (pc-i<0.5)?i:i+1 }")
  printf " $(($ACTUALTOTAL)) $PERCENT%%       $(($(date +'%s')-$STARTTIME)) seconds out of a estimated "
  node eta.js $ACTUALCOUNT $ACTUALTOTAL $(date +'%s') $STARTTIME
  printf " seconds \n"
done

node convertIntoReadableData.js # convert the data into a readable form for the website

TIME=$(date +"%D %T") # update the data on the webserver (github)
TIMEWRITE=$(cat readableData.json | underscore extend "{time: '$TIME'}")
echo $TIMEWRITE > readableData.json

echo pushing to github
git add *
git commit -m "update data $TIME CST"
git push
