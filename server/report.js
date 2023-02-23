var fs = require('fs');
var path = require('path');
const { updateDataset, getCurrentBacklog } = require("./APIFunction.js");
require('dotenv').config();

// module.exports.getBacklog = () => {
//   return getCurrentBacklog();
// }

module.exports.getOutput = (startDate, endDate) => {
  return updateDataset()
  .then(() => {
    var counter = 0;
    var engineerCount = {}
    var obj = JSON.parse(fs.readFileSync(path.join(__dirname, './data/data.json'), 'utf8'));
    console.log(`Searching from ${startDate} to ${endDate}`);
    // console.log(obj);
    
    var currentDate = new Date(startDate);
    endDate = new Date(endDate);
    endDate = endDate.setDate(endDate.getDate() + 1);

    for (i = currentDate; i < endDate; i = currentDate.setDate(currentDate.getDate() + 1)) {
      console.log(currentDate.toISOString().slice(0,10));
      for (var i = 0; i < obj.actions.length; i++) {
        if (obj.actions[i].data.listBefore != undefined) {
          if (obj.actions[i].data.listBefore.id === process.env.IN_DESIGN_LIST_ID && obj.actions[i].data.listAfter.id === process.env.DATA_ENTRY_LIST_ID && obj.actions[i].date.slice(0,10) == currentDate.toISOString().slice(0,10)) {
            // console.log(obj.actions[i].data.card.name); // logs jobs that were engineered
            // console.log(obj.actions[i].memberCreator.username); // logs engineer username
            var engineer = obj.actions[i].memberCreator.username;
            !engineerCount[engineer] ? engineerCount[engineer] = 1 : engineerCount[engineer]++
            counter++;
          }
        }
      }
    }
    console.log(engineerCount)
    return counter;
  })
}