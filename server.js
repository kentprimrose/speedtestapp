const PORT = process.env.PORT || 3000;
const INTERVAL = process.env.INTERVAL || 300000;
const MAX_TIME = process.env.MAX_TIME || 5000;
const STORAGE = process.env.STORAGE || './storage_memory';

const util = require('util');
const speedtest = require('speedtest-net');
const storage = require(STORAGE);
const express = require('express');
const app = express();

let getSpeed = () => {

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
  let avgDown = storage.avg('download').toFixed(2);
  let maxDown = storage.max('download').toFixed(2);
  let minDown = storage.min('download').toFixed(2);

  res.send(util.format('avg down: %s, max down: %s, min down: %s',
		       avgDown, maxDown, minDown));
});

app.listen(PORT, () => console.log('Listening on port %s', PORT));
