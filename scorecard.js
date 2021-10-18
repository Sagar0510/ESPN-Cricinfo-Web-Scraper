const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

function openScorecard(linkToScorecard) {
  request(linkToScorecard, cb);
  function cb(err, res, html) {
    if (err) {
      console.log(err);
    } else {
      getPlayerScores(html);
    }
  }
}
function getPlayerScores(html) {
  let $ = cheerio.load(html);
  // creatng a directory with the name of the series
  let seriesName = $(".description a").text();
  let seriesDirectory = path.join(__dirname, seriesName);
  createDirectory(seriesDirectory);

  //getting to each innings
  let ScoreCards = $(".card.content-block.match-scorecard-table .Collapsible"); // got 2 innings here
  for (let i = 0; i < ScoreCards.length; i++) {
    let TeamName = $(ScoreCards[i])
      .find(".section-header.border-bottom.text-danger.cursor-pointer h5")
      .text()
      .split("INNINGS")[0]
      .trim();
    let opponentName = $(ScoreCards[(i + 1) % 2])
      .find(".section-header.border-bottom.text-danger.cursor-pointer h5")
      .text()
      .split("INNINGS")[0]
      .trim();
    let Matchvenue = $(".header-info .description").text().split(",")[1].trim();
    let batsmenRow = $(ScoreCards[i]).find(".table.batsman tr");
    for (let j = 0; j < batsmenRow.length; j++) {
      let batsmenRowData = $(batsmenRow[j]).find("td");
      if (batsmenRowData.hasClass("batsman-cell")) {
        scrapeBatsmenInfo(
          TeamName,
          opponentName,
          $(batsmenRowData[0]).text().trim(),
          $(batsmenRowData[2]).text().trim(),
          $(batsmenRowData[3]).text().trim(),
          $(batsmenRowData[5]).text().trim(),
          $(batsmenRowData[6]).text().trim(),
          $(batsmenRowData[7]).text().trim(),
          Matchvenue,
          seriesName
        );
      }
    }
  }
}
function scrapeBatsmenInfo(
  TeamName,
  opponentName,
  PlayerName,
  runs,
  balls,
  fours,
  sixes,
  strikeRate,
  venue,
  seriesName
) {
  let obj = { opponentName, runs, balls, fours, sixes, strikeRate, venue };
  // creating new folder for the team
  let teamPath = path.join(__dirname, seriesName, TeamName);
  createDirectory(teamPath);

  // creating excel file to record the performance of the player
  let filepath = path.join(teamPath, PlayerName + ".xlsx");
  let content = excelReader(filepath, PlayerName); // reading the existing data for the current player
  content.push(obj); // adding this new data to that player's excel sheet
  excelWriter(filepath, content, PlayerName);
}

//utility funcitions

function createDirectory(filepath) {
  if (fs.existsSync(filepath) == false) {
    fs.mkdirSync(filepath);
  }
}
function excelReader(filePath, sheetName) {
  if (fs.existsSync(filePath) == false) {
    return [];
  }
  let wb = xlsx.readFile(filePath);
  let excelData = wb.Sheets[sheetName];
  let ans = xlsx.utils.sheet_to_json(excelData);
  return ans;
}

function excelWriter(filePath, json, sheetName) {
  let newWB = xlsx.utils.book_new();
  let newWS = xlsx.utils.json_to_sheet(json);
  xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
  xlsx.writeFile(newWB, filePath);
}

module.exports = {
  openScorecard: openScorecard,
};
