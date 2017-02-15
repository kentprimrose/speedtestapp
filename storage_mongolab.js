const API_KEY = process.env.API_KEY || 'TKVMJQX_MG2QTInjfPW6PJNw0oLuSbuP';

var mLab = require('mongolab-data-api')(API_KEY);

var defaultOptions = {
  database: 'time-warner-speeds',
  collectionName: 'results'
};

let getSpeed = () => {
  cmd.get('speed-test --json', (data) => {
    var options = Object.assign({}, defaultOptions, { documents: JSON.parse(data) });

    mLab.insertDocuments(options, (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  });
};

getSpeed();

setInterval(getSpeed, 300000);

app.get('/health', (req, res) => {
  mLab.listDocuments(defaultOptions, (err, data) => {
    var download = [];
    data.forEach(result => {
      download.push(result.download);
    });

    var max = Math.max.apply(null, download);
    var min = Math.min.apply(null, download);

    var sum = download.reduce((a, b) => a + b);
    var avg = sum / download.length;

    res.send('the average download speed has been: ' + avg.toFixed(2) + ' mbps, the max was: ' + max + ' and the min was: ' + min + '.');
  });
});

app.listen(3001, () => console.log('app listening on port 3001'));
