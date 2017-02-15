const util = require('util');
const speedtest = require('speedtest-net');
const storage = require('./storage_memory');
const express = require('express');
const app = express();

let getSpeed = () => {

  let test = speedtest({
    maxTime: 5000
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
setInterval(getSpeed, 30000);

app.get('/health', (req, res) => {
  let avgDown = storage.avg('download').toFixed(2);
  let maxDown = storage.max('download').toFixed(2);
  let minDown = storage.min('download').toFixed(2);

  res.send(util.format('avg down: %s, max down: %s, min down: %s',
		       avgDown, maxDown, minDown));
});

app.listen(3000, () => console.log('app listening on port 3000'));
