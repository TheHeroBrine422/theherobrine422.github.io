#!/bin/sh
APPINSTALL=false # set this to true if you need to instal the npm packages and the underscore cli app

#if [[ $APPINSTALL ]]; then
#  npm i request
#  npm install -g underscore-cli
#fi


rm -rf leaderboard.json readableData.json chart.json


echo \{\"participants\":100000,\"key14participants\":0,\"key13participants\":0,\"key12participants\":0,\"key11participants\":0,\"key10participants\":0,\"key9participants\":0,\"key8participants\":0,\"key7participants\":0,\"key6participants\":0,\"key5participants\":0,\"key4participants\":0,\"key3participants\":0,\"key2participants\":0,\"key1participants\":0,\"ranking50p\":\"0\",\"ranking25p\":\"0\",\"ranking10p\":\"0\",\"ranking5p\":\"0\",\"ranking1p\":\"0\",\"time\":\"01/16/19 10:30:09\"\} >> readableData.json
echo \{\"total\":95300,\"results\":[null]\} >> leaderboard.json
