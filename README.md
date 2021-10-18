# Batting Analyzer - ESPN-Cricinfo-Web-Scraper
This web scraper can be used to analyze the performance of every batsmen that played in a series (e.g. Indian Premier League).

## MS Dhoni IPL 2020-21 performance

- Excel sheet: MS Dhoni.xlsx
contains every performance of the player MS Dhoni vs each opponent all at one place in readable tabular form.

- opponentName            &emsp;   &emsp;             runs    &emsp; balls   &emsp;   fours  &emsp;  sixes   &emsp;  strikeRate  &emsp;  venue

1. Royal Challengers Bangalore    &emsp;  &emsp;        19    &emsp;   21   &emsp;      3      &emsp;    0    &emsp;  90.47       &emsp;   Dubai (DSC)
2. Mumbai Indians                 &emsp;   &emsp;       16    &emsp;   16      &emsp;    2      &emsp;   1     &emsp;    100.00    &emsp;    Sharjah
3. Delhi Capitals                  &emsp;   &emsp;      3    &emsp;     5       &emsp;     0      &emsp;     0    &emsp;    60.00       &emsp;     Sharjah
4. Kolkata Knight Riders             &emsp;  &emsp;       1    &emsp;   4        &emsp;    0      &emsp;     0    &emsp;     25.00    &emsp;       Dubai (DSC)
5. Sunrisers Hyderabad             &emsp;  &emsp;       21    &emsp;   13       &emsp;   2     &emsp;   1      &emsp;   161.53       &emsp;  Dubai (DSC)
6. Rajasthan Royals              &emsp;  &emsp;       28       &emsp;  28        &emsp;  2     &emsp;   0      &emsp;   100.00       &emsp;  Abu Dhabi
7. Royal Challengers Bangalore      &emsp;  &emsp;      10     &emsp;  6         &emsp;    0      &emsp;     1    &emsp;     166.66   &emsp;     Dubai (DSC)
8. Rajasthan Royals             &emsp;   &emsp;       29       &emsp;  17        &emsp;  0      &emsp;   3      &emsp;  170.58      &emsp;   Sharjah
9. Kolkata Knight Riders            &emsp;   &emsp;       11       &emsp;  12       &emsp;   1     &emsp;   0         &emsp; 91.66        &emsp;   Abu Dhabi
10. Delhi Capitals                &emsp;   &emsp;       15     &emsp;  12       &emsp;   2     &emsp;   0        &emsp;  125.00      &emsp;     Dubai (DSC)
11. Sunrisers Hyderabad           &emsp;   &emsp;       47     &emsp;  36       &emsp;   4     &emsp;   1        &emsp;  130.55      &emsp;  Dubai (DSC)
12. Mumbai Indians                &emsp;   &emsp;       0       &emsp;   2     &emsp;      0   &emsp;       0    &emsp;     0.00       &emsp;   Abu Dhabi

## How it works?

- The scraper runs through every game played in the series, creates the folder for every team, and inside the folder it creates excel sheets for each player that has ever batted in the series.

- The excel sheet contains the performance data (runs scored, balls played, fours, sixes, strike rate, match venue, opponent team) of each game played by that batsman, all organized at one place in a tabular readable form as shown above.

## How to use it?

1. Clone the repo and install the required Node.js packages.
2. Head over to https://www.espncricinfo.com/ci/content/match/fixtures_futures.html and find the series you want to scrape and click the series.
   now copy the URL of the series. 
    e.g.: https://www.espncricinfo.com/series/ipl-2021-1249214 for IPL 2020-21

3. now head over to main.js file and paste the copied link in the request function at line 6.
   e.g.: request("https://www.espncricinfo.com/series/ipl-2020-21-1210595", cb);

4. open terminal and run main.js file.
    e.g: node main.js 

5. done!!

6. A new folder will be created with the series name, which will contain folders of all the teams, which will have excel files of all the batsmen seperately, containing the performance data of every match well organized all at one place!
