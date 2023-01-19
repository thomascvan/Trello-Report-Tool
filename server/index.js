const express = require('express');
var cors = require('cors')

const { getOutput } = require("./report.js");

const app = express();
const port = 3000;

app.use(cors())


// compress all responses

app.use(express.json());

app.post('/', (req, res) => {
    console.log(req.body.startDate);
    console.log(req.body.endDate);
    var count = getOutput(req.body.startDate, req.body.endDate)
    console.log(count);
    res.send(`${count}`);
  })

app.listen(port, () => {
  console.log(`Atelier is listening on port ${port}`)
})