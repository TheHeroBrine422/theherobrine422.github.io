const puppeteer = require('puppeteer');
const fs = require('fs');

function delay(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

evalWait = 5000
buttonWait = 500
loadWait = 5000
counter = 0 // debug

async function pullData(page) {
  await delay(evalWait)
  counter++; //debug
  console.log(counter) // debug
  resultsTemp = await page.evaluate(() => { // format: [[pos, teamName, schoolName, wins, loss, gameRecord], ...]
    table = document.getElementsByClassName("rt-tbody")[0].children
    results = []
    for (var i = 0; i < table.length; i++) {
      results[i] = []
      results[i].push(table[i].children[0].children[0].innerText)
      results[i].push(table[i].children[0].children[1].children[0].children[1].children[0].innerText)
      results[i].push(table[i].children[0].children[1].children[0].children[1].children[1].innerText)
      results[i].push(table[i].children[0].children[2].innerText)
      results[i].push(table[i].children[0].children[3].innerText)
      results[i].push(table[i].children[0].children[4].innerText)
    }
    return results;
  })
  return resultsTemp;
}

// function printMousePos(event) { console.log("clientX: " + event.clientX + " - clientY: " + event.clientY); } document.addEventListener("click", printMousePos); function to figure out x/y coordinates

Settings = fs.readFileSync('Settings.json','utf8');
Settings = JSON.parse(Settings);

(async () => {
  const browser = await puppeteer.launch({"headless": false, "devtools": true});
  const page = await browser.newPage();
  await page.setViewport({width: 1280, height: 720});
  await page.goto('https://app.playvs.com/login', {timeout: 0});

  results = {
    "Rocket League": {
      "Pre-Season": [],
      "Regular Season": [],
      "Playoffs": []
    },
    "League of Legends": {
      "Pre-Season": [],
      "Regular Season": [],
      "Playoffs": []
    },
    "Smite": {
      "Pre-Season": [],
      "Regular Season": [],
      "Playoffs": []
    }
  }

  await delay(loadWait); // login
  await page.type('[type="email"]', Settings.username);
  await page.type('[type="password"]', Settings.password);
  await page.click('[type="submit"]');
  await delay(buttonWait);
  await page.goto('https://app.playvs.com/app/standings/regular-season', {timeout: 0});
  await delay(loadWait)
  results["Rocket League"]["Regular Season"] = await pullData(page);
  await page.click('[id="standings-league-filter"]')
  await delay(buttonWait)
  await page.click('[value="1"]')
  results["League of Legends"]["Regular Season"] = await pullData(page);
  await page.click('[id="standings-league-filter"]')
  await delay(buttonWait)
  //await page.click('[value="2"]') // smite broken
  //results["Smite"]["Regular Season"] = await pullData(page);

  await page.goto('https://app.playvs.com/app/standings/preseason', {timeout: 0});
  await delay(loadWait)
  results["Rocket League"]["Pre-Season"] = await pullData(page);
  await page.click('[id="standings-league-filter"]')
  await delay(buttonWait)
  await page.click('[value="1"]')
  results["League of Legends"]["Pre-Season"] = await pullData(page);
  await page.click('[id="standings-league-filter"]')
  await delay(buttonWait)
  //await page.click('[value="2"]')
  //results["Smite"]["Pre-Season"] = await pullData(page);

  await page.goto('https://app.playvs.com/app/standings/playoffs', {timeout: 0});
  await delay(loadWait)
  results["Rocket League"]["Pre-Season"] = await pullData(page);
  await page.click('[id="standings-league-filter"]')
  await delay(buttonWait)
  await page.click('[value="1"]')
  results["League of Legends"]["Pre-Season"] = await pullData(page);
  await page.click('[id="standings-league-filter"]')
  await delay(buttonWait)
  //await page.click('[value="2"]')
  //results["Smite"]["Pre-Season"] = await pullData(page);

  fs.writeFileSync("data.json", JSON.stringify(results))

  await delay(1000); // cleanly exit
  await browser.close()
  await process.exit()
})();
