const express = require('express');
var cors = require('cors');
const path = require('path');

const { getOutput } = require("./report.js");

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

app.post('/', (req, res) => {
    console.log(req.body.startDate);
    console.log(req.body.endDate);
    var count = getOutput(req.body.startDate, req.body.endDate)
    console.log(count);
res.send(`${count}`);
})

app.listen(port, () => {
  console.log(`Trello Report Tool is listening on port ${port}`)
})