#!/bin/sh

node "main.js"
git add data.json
TIME=$(date +"%D %T")
git commit -m "pvlb updating data $TIME CST"
git push
