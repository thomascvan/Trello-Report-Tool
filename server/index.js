const express = require('express');
var cors = require('cors');
const path = require('path');

const { getOutput } = require("./report.js");
const { getCurrentBacklog } = require("./APIFunction.js");


const app = express();
const port = 3000;
app.use(express.json());

app.use(cors())
const DIST_DIR = path.join(__dirname, '../client/dist');
app.use(express.static(DIST_DIR));


// compress all responses




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
      output = response;
      jobsPerDay = output/workingDays;
      leadTime = backlog/jobsPerDay;
      console.log('Lead Time:', leadTime);
      res.send({
        output: output,
        leadTime: leadTime
      });
      // res.send(`${response}`);
    })
  })
})

app.listen(port, () => {
  console.log(`Trello Report Tool is listening on port ${port}`)
})


// helper functions
function calcBusinessDays(startDate, endDate) { // input given as Date objects
  var startDate = new Date(startDate);
  var endDate = new Date(endDate);

  let businessDays = 0;
  const curDate = new Date(startDate.getTime());
  while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if(dayOfWeek !== 0 && dayOfWeek !== 6) businessDays++;
      curDate.setDate(curDate.getDate() + 1);
  }
  return businessDays;
}