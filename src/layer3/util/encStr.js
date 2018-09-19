
const a2hex = (str) => {
	let arr = [];
	for (let i = 0, l = str.length; i < l; i++) {
		let hex = '00' + (Number(str.charCodeAt(i)).toString(16));
		hex = hex.substr(hex.length - 2);
		arr.push(hex);
	}
	return arr.join('');
};

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const encStr = (s) => {
	let key = getRandomInt(0, 255), str = s.split('');
	for (let i = 0; i < str.length; i++) {
		str[i] = str[i].charCodeAt(0) ^ key;
	}
	for (let i = 0; i < str.length; i++) {
		str[i] = String.fromCharCode(str[i]);
	}
	let extraChar = getRandomInt(0, 255);
	return a2hex(String.fromCharCode(extraChar) + String.fromCharCode(key) + str.join(''));
};

module.exports = encStr;
