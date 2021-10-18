const cheerio = require("cheerio");
const request = require("request");
const AllMatchObj = require("./AllMatches");

// paste https://www.espncricinfo.com/series/<series link> url here
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595", cb);

function cb(err, res, html) {
  if (err) {
    console.log(err);
  } else {
    findAllMatches(html);
  }
}
function findAllMatches(html) {
  let $ = cheerio.load(html);

  // head over to all match results
  let AllResultsElement = $(".widget-items.cta-link");
  let linkToResults =
    "https://www.espncricinfo.com" + AllResultsElement.find("a").attr("href");
  AllMatchObj.findAllScoreCards(linkToResults);
}
