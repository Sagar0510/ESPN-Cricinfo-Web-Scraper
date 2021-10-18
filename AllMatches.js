const cheerio = require("cheerio");
const request = require("request");
const scorecardObj = require("./scorecard");

function findAllScoreCards(linkToResults) {
  request(linkToResults, cb); // request each scorecard from the series
  function cb(err, res, html) {
    if (err) {
      console.log(err);
    } else {
      extractScoreboard(html);
    }
  }
}
function extractScoreboard(html) {
  let $ = cheerio.load(html);
  let allCards = $(
    ".card.content-block.league-scores-container .match-cta-container"
  );
  for (let i = 0; i < allCards.length; i++) {
    // iterate for all the completed matches
    let buttons = $(allCards[i]).find("a");
    let linkToScorecard =
      "https://www.espncricinfo.com" + $(buttons[2]).attr("href");
    scorecardObj.openScorecard(linkToScorecard);
  }
}
module.exports = {
  findAllScoreCards: findAllScoreCards,
};
