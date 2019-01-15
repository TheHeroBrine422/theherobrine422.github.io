const puppeteer = require('puppeteer');
const fs = require('fs');

function delay(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function openPage() {
  (async () => {
    const browser = await puppeteer.launch({"headless": false, "devtools": true});
    const page = await browser.newPage();
    await page.setViewport({width: 1280, height: 720});
    await page.goto('https://twitch.tv/' + Settings.channel, {timeout: 0});
    // stop from auto close
  })();
}
