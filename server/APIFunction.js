require('dotenv').config();
const axios = require('axios');
var fs = require('fs');
var path = require('path');


// Replace with your Trello API key and token
const API_KEY = process.env.KEY;
const TOKEN = process.env.TOKEN;

module.exports.updateDataset = () => {
  return axios.get(`https://api.trello.com/1/boards/${process.env.BOARD_ID}/`, {
    params: {
      key: API_KEY,
      token: TOKEN,
      fields: 'all',
      actions: 'all',
      actions_limit: 1000
    }
  }).then(response => {
    fs.writeFileSync(path.join(__dirname, './data/data.json'), JSON.stringify(response.data))
    console.log('written')
  })
}