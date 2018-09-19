
module.exports = (key, str) => {
	let modifier = str.length % 255;
	for (let i = 0; i < str.length; i++) {
		let keyIndex = i % key.length;
		let keyTemp = key[keyIndex];
		keyTemp = (keyTemp ^ str.charCodeAt(i)) ^ modifier;
		key[keyIndex] = keyTemp;
	}
	return key;
};
