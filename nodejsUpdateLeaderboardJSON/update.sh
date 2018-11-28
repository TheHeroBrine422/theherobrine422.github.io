#!/bin/sh
COUNTER=130
while [ true ]
do
  node updateLeaderboard.js $COUNTER
  COUNTER=$(($COUNTER+1))
  echo $COUNTER
done
