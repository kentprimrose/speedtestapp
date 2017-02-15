const API_KEY = process.env.API_KEY || 'TKVMJQX_MG2QTInjfPW6PJNw0oLuSbuP';
const mLab = require('mongolab-data-api')(API_KEY);

const OPTIONS = {
  database: 'time-warner-speeds',
  collectionName: 'results'
};

module.exports = {

  store: (data) => {
    mLab.insertDocuments(options, (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  },

  avg: (val, callback) => {
  },

  max: (val, callback) => {
  },

  min: (val, callback) => {
  }
  
};

app.get('/health', (req, res) => {
  mLab.listDocuments(OPTIONS, (err, data) => {
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
