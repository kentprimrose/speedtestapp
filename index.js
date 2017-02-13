var cmd = require('node-cmd');

cmd.get('speed-test --json', data => {
  console.log(data);
});
