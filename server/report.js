var fs = require('fs');
var path = require('path');

// List dictionary
var lists = {
  'Engineering Queue': '635a82b77dc34d052c428471',
  'Expedites': '636aaa703778a90550a5ca95',
  'Layout': '635ac9c199d5fd02ce66210d',
  'In Design': '635a82c0222dd201c3566620',
  'Need/Missing Info From Sales': '638535f64fd75d00b4c284b3',
  'Data Entry': '635a82e622836b00d0ab9e43',
  'Released': '63921ed2610c4900859fa15d'
}

module.exports.getOutput = (startDate, endDate) => {
  var obj = JSON.parse(fs.readFileSync(path.join(__dirname, './data/data.json'), 'utf8'));

  console.log(`Searching date ${endDate}`);
  
  var counter = 0;
  
  for (var i = 0; i < obj.actions.length; i++) {
    if (obj.actions[i].data.listBefore != undefined) {
  
      if (obj.actions[i].data.listBefore.id === '635a82c0222dd201c3566620' && obj.actions[i].data.listAfter.id === '635a82e622836b00d0ab9e43' && obj.actions[i].date.slice(0,10) == endDate) {
        // console.log(obj.actions[i].data.card.name)
        counter++;
      }
    }
  }
  // console.log(counter);
  return counter;
}