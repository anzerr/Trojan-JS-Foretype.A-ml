
/**
 * This is the cleaned up version of what the first script does without all the it being obfuscated
 *
 * @param  {[type]} bufferData [description]
 * @param  {[type]} formatKey  [description]
 * @returns {[type]}            [description]
 */
module.exports = (bufferData, formatKey) => {
	let outputData = [];
	for (let i = 0; i < bufferData.length; i += 2) {
		outputData.push(parseInt(bufferData.substr(i, 2), 16));
	}

	for (let i = 1; i <= formatKey.length; i++) {
		let tmp = (formatKey.substr(formatKey.length - i)).split('');
		for (let x = 0; x < outputData.length; x++) {
			outputData[x] = outputData[x] ^ tmp[x % tmp.length].charCodeAt(0);
		}
	}

	let i = 0;
	while (i < outputData.length) {
		outputData[i] = String.fromCharCode(outputData[i]);
		i++;
	}
	return outputData.join('');
};
