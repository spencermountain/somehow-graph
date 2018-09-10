var build = require('./build');
var gaze = require('gaze');
var bs = require("browser-sync").create();


gaze(['./src/**'], {}, function(err) {
  if (err) {
    console.log(err);
  }
  //On changed/added/deleted
  this.on('changed', function() {
    build()
  });
});


bs.init({
  server: "./"
});
// bs.reload("*.html");
bs.watch(["./builds/**", './demo/main.js']).on("change", bs.reload);
