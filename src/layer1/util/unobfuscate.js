
const vm = require('vm');

/**
 * cleanup the source ot make it easyer to read
 */
class Util {

	collapseNumberSub(data) {
		let a = data, b = a.match(/\(-?\d+\s-\s-?\d+\)/g), x = 0;
		for (let i in b) {
			let n = b[i].match(/-?\d+/g);
			a = a.replace(b[i], '(' + (parseInt(n[0], 10) - parseInt(n[1], 10)) + ')');
			x++;
		}
		return [a, x];
	}

	collapseNumberAdd(data) {
		let a = data, b = a.match(/\(-?\d+\s\+\s-?\d+\)/g), x = 0;
		for (let i in b) {
			let n = b[i].match(/-?\d+/g);
			a = a.replace(b[i], '(' + (parseInt(n[0], 10) + parseInt(n[1], 10)) + ')');
			x++;
		}
		return [a, x];
	}

	collapseNumber(data) {
		let a = data, b = a.match(/\((\d+,\s?)+(\d)\)/g), x = 0;
		for (let i in b) {
			let n = b[i].match(/\((\d+,\s?)+(\d)\)/);
			a = a.replace(b[i], '(' + n[2] + ')');
			x++;
		}
		return [a, x];
	}

	collapseAlpha(data) {
		let a = data, b = a.match(/\(("[a-zA-Z0-P]+",\s?)+("[a-zA-Z0-P]+")\)/g), x = 0;
		for (let i in b) {
			let n = b[i].match(/\(("[a-zA-Z0-P]+",\s?)+("[a-zA-Z0-P]+")\)/);
			a = a.replace(b[i], '(' + n[2] + ')');
			x++;
		}
		return [a, x];
	}

	collapseArray(data) {
		let a = data, b = a.match(/\[["a-zA-Z,\s0-9]*?\]\[\(?\d+\)?]/g), x = 0;
		for (let i in b) {
			let n = b[i].split(/\]\[/);
			a = a.replace(b[i], '"' + JSON.parse(n[0] + ']')[n[1].match(/\d+/)[0]] + '"');
			x++;
		}
		return [a, x];
	}

	combineString(data) {
		let a = data, b = a.match(/(\(?"[a-zA-Z]+"\)?\s\+\s)*(\(?"[a-zA-Z]+"\)?)/g), x = 0;

		for (let i in b) {
			let sandbox = {out: ''};
			vm.createContext(sandbox); // is this safe?
			vm.runInContext('out = ' + b[i], sandbox);
			a = a.replace(b[i], '"' + sandbox.out + '"');
			x++;
		}
		return [a, x];
	}

	intToString(data) {
		let a = data, b = a.match(/\((\d+?)\)\["toString"\]\((.+?)\)/g), x = 0;
		for (let i in b) {
			let n = b[i].match(/\((\d+?)\)\["toString"\]\((.+?)\)/);
			a = a.replace(b[i], '"' + (parseInt(n[1], 10)).toString(n[2]) + '"');
			x++;
		}
		return [a, x];
	}

	parseInt(data) {
		let a = data, b = a.match(/parseInt\((\d+),\s(\d+)\)/g), x = 0;
		for (let i in b) {
			let n = b[i].match(/parseInt\((\d+),\s(\d+)\)/);
			a = a.replace(b[i], parseInt(parseInt(n[1], 10), parseInt(n[2], 10)));
			x++;
		}
		return [a, x];
	}

	toUpperCase(data) {
		let a = data, b = a.match(/"([a-z]+)".toUpperCase\(\)/g), x = 0;
		for (let i in b) {
			let n = b[i].match(/"([a-z]+)".toUpperCase\(\)/);
			a = a.replace(b[i], '"' + n[1].toUpperCase() + '"');
			x++;
		}
		return [a, x];
	}

}

module.exports = new Util();
