var cmd = require('node-cmd');
var mLab = require('mongolab-data-api')('TKVMJQX_MG2QTInjfPW6PJNw0oLuSbuP');

var options = {
  database: 'time-warner-speeds',
  collectionName: 'results'
};

let getSpeed = () => {
  cmd.get('speed-test --json', (data) => {
    options.documents = JSON.parse(data);

    mLab.insertDocuments(options, (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  });
};

getSpeed();

setInterval(getSpeed, 30000);
