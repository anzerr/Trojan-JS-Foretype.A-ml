/* eslint-disable */

const fs = require('fs'),
    encKey = require('./util/encKey.js'),
    parse = require('./util/parse.js');

var thisFunctionText = require('./input/thisfunc.js');
var callerFunctionText = require('./input/caller.js');
var key = [123, 105, 76, 81, 68, 32, 165, 155, 238, 179];
var i;
try {
    callerFunctionText += navigator.appCodeName;
    callerFunctionText += 'callerFunctionText';
} catch (e) {}
key = encKey(key, callerFunctionText);
key = encKey(key, thisFunctionText);

let d = parse(require('./input/input.js'), key);
fs.writeFileSync('./output/layer3.raw', d);
console.log(d);