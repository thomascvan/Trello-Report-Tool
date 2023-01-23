var fs = require('fs');
var path = require('path');
const { updateDataset } = require("./APIFunction.js");


module.exports.getOutput = (startDate, endDate) => {
  return updateDataset()
  .then(() => {
    var counter = 0;
    var obj = JSON.parse(fs.readFileSync(path.join(__dirname, './data/data.json'), 'utf8'));
    console.log(`Searching from ${startDate} to ${endDate}`);

    var currentDate = new Date(startDate);
    endDate = new Date(endDate);
    endDate = endDate.setDate(endDate.getDate() + 1);

    for (i = currentDate; i < endDate; i = currentDate.setDate(currentDate.getDate() + 1)) {
      console.log(currentDate.toISOString().slice(0,10));
      for (var i = 0; i < obj.actions.length; i++) {
        if (obj.actions[i].data.listBefore != undefined) {

          if (obj.actions[i].data.listBefore.id === '635a82c0222dd201c3566620' && obj.actions[i].data.listAfter.id === '635a82e622836b00d0ab9e43' && obj.actions[i].date.slice(0,10) == currentDate.toISOString().slice(0,10)) {
            // console.log(obj);
            counter++;
          }
        }
      }
    }
    return counter;
  })
}