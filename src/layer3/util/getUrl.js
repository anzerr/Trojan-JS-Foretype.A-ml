
module.exports = (u) => {
	let res = '', url = u.split('');
	for (let i = 0; i < url.length; i++) {
		if (i % 2 === 1) {
			res += url[i];
		}
	}
	return res.split('').reverse().join('');
};
