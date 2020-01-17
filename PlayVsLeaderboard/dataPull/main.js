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

async function pullData(page) {
  await delay(evalWait)
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
    }
    return results;
  })
  return resultsTemp;
}

async function pullDataPlayoffs(page) { // wip
  await delay(evalWait)
  resultsTemp = await page.evaluate(() => { // format: [[pos, teamName, schoolName, wins, loss, gameRecord], ...]
    columns = document.getElementsByClassName("slick-list")[0].children[0].children
    results = [] // [["round name", "date", ["team1", "team2", winner (0/1)], ...], ...]
    for (var i = 0; i < columns.length-1; i++) {
      results[i] = []
      results[i].push(document.getElementsByClassName("slick-list")[0].children[0].children[i].children[0].children[0].children[0].children[0].innerText)
      results[i].push(document.getElementsByClassName("slick-list")[0].children[0].children[i].children[0].children[0].children[0].children[2].innerText)
      games = columns[i].children[0].children[0].children[1].children
      for (var j = 0; j < games.length; j++) {
        console.log(i+" "+j+" "+games[j].children[0].children[0].children.length)
        game = []
        if (games[j].children[0].children[0].children.length == 0) {
          if (games[j].children[0].children[2].children.length == 0) {
            game = ["","",2]
          } else {
            game.push(games[j].children[0].children[2].children[1].innerText)
            game.push(games[j].children[1].children[2].children[1].innerText)
            if (games[j].children[0].children[2].children[2].innerText == "W") {
              game.push(0)
            } else if (games[j].children[1].children[2].children[2].innerText == "W") {
              game.push(1)
            } else {
              game.push(2)
            }
          }
        } else {
          if (games[j].children[0].children[0].children[2].children.length == 0) {
            game = ["","",2]
          } else {
            game.push(games[j].children[0].children[0].children[2].children[1].innerText)
            game.push(games[j].children[1].children[0].children[2].children[1].innerText)
            if (games[j].children[0].children[0].children[2].children[2].innerText == "W") {
              game.push(0)
            } else if (games[j].children[1].children[0].children[2].children[2].innerText == "W") {
              game.push(1)
            } else {
              game.push(2)
            }
          }
        }
        results[i].push(game)
      }
    }
    console.log(results)
    return results;
  })
  console.log(resultsTemp)
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

  console.log("regular season")
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

  console.log("preseason")
  await page.goto('https://app.playvs.com/app/standings/preseason', {timeout: 0});
  await delay(loadWait)
  results["Rocket League"]["Pre-Season"] = await pullData(page);
  await page.click('[id="standings-league-filter"]')
  await delay(buttonWait)
  await page.click('[value="1"]')
  results["League of Legends"]["Pre-Season"] = await pullData(page);
  await page.click('[id="standings-league-filter"]')
  await delay(buttonWait)
  //await page.click('[value="2"]') // smite broken
  //results["Smite"]["Pre-Season"] = await pullData(page);

  console.log("playoffs")
  await page.goto('https://app.playvs.com/app/standings/playoffs', {timeout: 0});
  await delay(loadWait)
  results["Rocket League"]["Playoffs"] = await pullDataPlayoffs(page);
  await page.click('[id="standings-league-filter"]')
  await delay(buttonWait)
  await page.click('[value="1"]')
  results["League of Legends"]["Playoffs"] = await pullDataPlayoffs(page);
  await page.click('[id="standings-league-filter"]')
  await delay(buttonWait)
  await page.click('[value="2"]')
  results["Smite"]["Playoffs"] = await pullDataPlayoffs(page);
  await delay(evalWait)

  fs.writeFileSync("data.json", JSON.stringify(results))

  await delay(1000); // cleanly exit
  await browser.close()
  await process.exit()
})();
