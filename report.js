var fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });
var obj = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));

const input = prompt("What date? (Format MM-DD-YYYY) ");
const date = `${input.slice(-4)}-${input.slice(0,2)}-${input.slice(3,5)}`
console.log(`Searching date ${date}`);

var counter = 0;
for (var i = 0; i < obj.actions.length; i++) {
  if (obj.actions[i].data.listBefore != undefined) {

    if (obj.actions[i].data.listBefore.id === '635a82c0222dd201c3566620' && obj.actions[i].data.listAfter.id === '635a82e622836b00d0ab9e43' && obj.actions[i].date.slice(0,10) == date) {
      console.log(obj.actions[i].data.card.name)
      counter++;
    }
  }
}

console.log(counter);
