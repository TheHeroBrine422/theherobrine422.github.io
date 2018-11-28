#!/bin/sh
COUNTER=0
TOTAL=$(cat leaderboard.json | underscore select '.total' | grep -o "[0-9]")
while [ $COUNTER > $TOTAL ]
do
  node update.js $COUNTER
  COUNTER=$(($COUNTER+1))
  echo $COUNTER
done

echo $TOTAL
