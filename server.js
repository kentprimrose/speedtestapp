const PORT = process.env.STA_PORT || 3000;
const INTERVAL = process.env.STA_INTERVAL || 30000;
const MAX_TIME = process.env.STA_MAX_TIME || 5000;
const STORAGE = process.env.STA_STORAGE || './storage_calc';

const util = require('util');
const speedtest = require('speedtest-net');
const storage = require(STORAGE);
const express = require('express');
const app = express();

let getSpeed = () => {
	console.log('Testing...');
	
	let test = speedtest({
		maxTime: MAX_TIME
	});

	test.on('data', data => {
		console.log('download: %s', data.speeds.download);
		console.log('upload: %s', data.speeds.upload);
		storage.store({
			'download': data.speeds.download,
			'upload': data.speeds.upload
		});
	});

	test.on('error', err => {
		console.log('error: %s', err);
	});

};

getSpeed();
setInterval(getSpeed, INTERVAL);

app.get('/health', (req, res) => {
	storage.vals('download', function(results) {
		res.send(util.format('avg down: %s, max down: %s, min down: %s',
												 results.avg.toFixed(2),
												 results.max.toFixed(2),
												 results.min.toFixed(2)));
	});
});

app.listen(PORT, () => console.log('Listening on port %s', PORT));
