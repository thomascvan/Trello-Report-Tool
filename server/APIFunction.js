require('dotenv').config();
const axios = require('axios');
var fs = require('fs');
var path = require('path');


// Replace with your Trello API key and token
const API_KEY = process.env.KEY;
const TOKEN = process.env.TOKEN;
const QUEUE_LIST = process.env.QUEUE_LIST_ID;
const EXPEDITE_LIST = process.env.EXPEDITES_LIST_ID;
const LAYOUT_LIST = process.env.LAYOUT_LIST_ID;
const IN_DESIGN_LIST = process.env.IN_DESIGN_LIST_ID;

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

module.exports.getCurrentBacklog = () => {
  let options= {
    params: {
      key: API_KEY,
      token: TOKEN,
    }
  };

  var backlog = 0;

  return axios.get(`https://api.trello.com/1/lists/${QUEUE_LIST}/cards/`, options)
  .then(response => {
    backlog += response.data.length;
  })
  .then(() => {
    return axios.get(`https://api.trello.com/1/lists/${EXPEDITE_LIST}/cards/`, options)
    .then(response => {
      backlog += response.data.length;
    })
  })
  .then(() => {
    return axios.get(`https://api.trello.com/1/lists/${LAYOUT_LIST}/cards/`, options)
    .then(response => {
      backlog += response.data.length;
    })
  })
  .then(() => {
    return axios.get(`https://api.trello.com/1/lists/${IN_DESIGN_LIST}/cards/`, options)
    .then(response => {
      backlog += response.data.length;
    })
  })
  .then(() => {
    // console.log(backlog)
    return backlog;
  })
  .catch(err => {
    console.log(err)
  })
}