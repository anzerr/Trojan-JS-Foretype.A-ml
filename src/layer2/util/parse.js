
module.exports = (input, key) => {
	let encStr = [];
	for (let i = 0; i < input.length; i += 2) {
		encStr.push(parseInt(input.substr(i, 2), 16));
	}
	let tmpKey = [];
	let tmpKeyLength = 1;
	while (tmpKeyLength <= key.length) {
		tmpKey = key.slice(key.length - tmpKeyLength);
		for (let i = 0; i < encStr.length; i++) {
			encStr[i] = encStr[i] ^ tmpKey[i % tmpKey.length];
		}
		tmpKeyLength++;
	}
	for (let i = 0; i < encStr.length; i++) {
		encStr[i] = String.fromCharCode(encStr[i]);
	}
	return encStr.join('');
};
