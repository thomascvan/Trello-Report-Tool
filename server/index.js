const express = require('express');
var cors = require('cors');
const path = require('path');
const axios = require('axios');
const cron = require('node-cron');
require('dotenv').config();

const { getOutput } = require("./report.js");
const { getCurrentBacklog } = require("./APIFunction.js");

const app = express();

const port = 3000;
app.use(express.json());

app.use(cors())
const DIST_DIR = path.join(__dirname, '../client/dist');
app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
    res.send('ok');
})

app.get('/backlog', (req, res) => {
  getCurrentBacklog()
  .then(backlog => console.log(backlog))
  res.send('ok');
})

app.post('/', (req, res) => {
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  console.log(startDate);
  let workingDays = calcBusinessDays(startDate, endDate);

  console.log('Start date:', startDate);
  console.log('Start date:', endDate);
  console.log('Working Days:', workingDays);

  let output = 0;
  let jobsPerDay = 0;
  let backlog = 0;
  let leadTime = 0;
  getCurrentBacklog()
  .then(response => {
    backlog = response;
    console.log('Backlog:', backlog);
  })
  .then(() => {
    getOutput(startDate, endDate)
    .then(response => {
      output = response.counter;
      engineerCount = response.engineerCount
      console.log('Output:', output);
      jobsPerDay = output/workingDays;
      leadTime = Math.round(backlog/jobsPerDay * 100) / 100;
      console.log('Lead Time:', leadTime);
      console.log('Query Time:', (new Date()).toLocaleString());
      res.send({
        output: output,
        leadTime: leadTime,
        backlog: backlog,
        engineerCount: engineerCount
      });
    })
  })
})

app.listen(port, () => {
  console.log(`Trello Report Tool is listening on port ${port}`)
})

// update trello card at start up
updateLeadTimeCard();

// cron
cron.schedule(`0 4 * * *`, () => { // updates card every 4 AM
  updateLeadTimeCard();
})


// helper functions
function calcBusinessDays(startDate, endDate) { // input given as Date objects
  var startDate = new Date(startDate);
  var endDate = new Date(endDate);

  let businessDays = 0;
  const curDate = new Date(startDate.getTime());
  while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      console.log(dayOfWeek)
      if(dayOfWeek !== 5 && dayOfWeek !== 6) businessDays++;
      curDate.setDate(curDate.getDate() + 1);
  }
  return businessDays;
}

function business_day_from_date(daysAgo, date) {
  const result = [];
  const d = new Date(date);
  while (daysAgo > 0) {
    d.setDate(d.getDate() - 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      daysAgo--;
      result.push(new Date(d));
    }
  }
  return result.reverse()[0];
}

function updateLeadTimeCard() {
  let endDate = business_day_from_date(1, Date()).toISOString().split('T')[0];
  let startDate = business_day_from_date(10, Date()).toISOString().split('T')[0];
  let workingDays = calcBusinessDays(startDate, endDate);

  console.log('Start date:', startDate);
  console.log('Start date:', endDate);
  console.log('Working Days:', workingDays);

  let output = 0;
  let jobsPerDay = 0;
  let backlog = 0;
  let leadTime = 0;
  getCurrentBacklog()
  .then(response => {
    backlog = response;
    console.log('Backlog:', backlog);
  })
  .then(() => {
    getOutput(startDate, endDate)
    .then(response => {
      output = response.counter;
      engineerCount = response.engineerCount
      console.log('Output:', output);
      jobsPerDay = output/workingDays;
      leadTime = Math.round(backlog/jobsPerDay * 100) / 100;
      console.log('Lead Time:', leadTime);
      console.log('Query Time:', (new Date()).toLocaleString());
      let options = {
        method: 'put',
        url: `https://api.trello.com/1/card/${process.env.LEAD_TIME_CARD}/`,
        params: {
          key: process.env.KEY,
          token: process.env.TOKEN,
          name: `LEAD TIME: ${leadTime} DAYS`,
          desc: `**CALCULATED OVER THE LAST 10 BUSINESS DAYS**`
        }
      };
      axios(options)
      .then(console.log('Lead Time Updated'))
      .catch(err => {
        console.log('error updating lead time:', err);
      })
    })
  })
}