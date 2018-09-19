
const fs = require('fs'),
	util = require('./util/unobfuscate.js');

let a = fs.readFileSync('./input/formated.js').toString();

let combine = () => {
	a = util.collapseArray(a)[0];
	a = util.collapseAlpha(a)[0];
	a = util.combineString(a)[0];
	a = util.intToString(a)[0];
	a = util.toUpperCase(a)[0];
	a = util.collapseAlpha(a)[0];
	a = util.parseInt(a)[0];
};

a = util.collapseNumberSub(a)[0];
a = util.collapseNumberAdd(a)[0];
a = util.collapseNumber(a)[0];
a = util.collapseAlpha(a)[0];
a = util.collapseArray(a)[0];
a = util.intToString(a)[0];
for (let i = 0; i < 32; i++) {
	combine();
}

fs.writeFileSync('./output/layer1.js', a);
