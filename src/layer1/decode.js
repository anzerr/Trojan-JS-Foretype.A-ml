
const readable = require('./util/decode.js'),
	fs = require('fs');

let a = readable(require('./input/input.js'), 'hfaealxhc');
fs.writeFileSync('./output/layer2.raw', a);
console.log(a);
