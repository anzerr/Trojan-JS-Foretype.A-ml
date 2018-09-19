
const http = require('http'),
	url = require('url');

const getUrl = require('./util/getUrl.js'),
	getRandHexStr = require('./util/getRandHexStr.js'),
	encStr = require('./util/encStr.js');

let fileUrl = getUrl('9fzi&g8.ikjnea.lmb4/js2u8.fytlkpqp:u.s8h.c#ektunxe:ejr/gl.#n2i/mtd:a&y:mip3hyp#');
let tid = getUrl('882025q');
let authKey = getRandHexStr(16);
fileUrl = 'http://' + getRandHexStr(8) + '.' + fileUrl;

console.log({
	fileUrl: fileUrl,
	tid: tid,
	authKey: authKey
});

const buildRequest = () => {
	let req = [];
	req.push(getRandHexStr(8));
	req.push(tid);
	req.push(Number(new Date()));
	let q = '';
	console.log(req);
	try {
		for (let i = 0; i < req.length; i++) {
			q += i + '=' + encodeURIComponent(String(req[i])) + '&';
		}
		console.log(q);
		q = encStr(q);
		console.log(q);
	} catch (error) {
		console.log('something fucked up', error);
	}

	let endPoint = url.parse(fileUrl);
	return [{
		method: 'POST',
		hostname: endPoint.hostname,
		path: endPoint.path,
		headers: {
			'authHeader': authKey,
			'Content-type': 'application/x-www-form-urlencoded'
		}
	}, 'a=' + q];
};

const runRequest = () => {
	return new Promise((resolve) => {
		let request = buildRequest();

		let req = http.request(request[0], (res) => {
			let chunks = [];

			// console.log(res);
			res.on('data', (chunk) => {
				chunks.push(chunk);
			});

			res.on('end', () => {
				let body = Buffer.concat(chunks);
				resolve([
					res.statusCode,
					body.toString()
				]);
			});
		});

		req.write(request[1]);
		req.end();
	});
};

runRequest().then((res) => {
	console.log(res);
	// what now the server does nothing
});

