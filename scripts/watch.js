var build = require('./build');
var gaze = require('gaze');
var bs = require("browser-sync").create();


gaze(['./demo/**', './src/**'], {}, function(err) {
  if (err) {
    console.log(err);
  }
  //On changed/added/deleted
  this.on('changed', function(abs) {
    console.log(abs)
    build()
  });
});


bs.init({
  server: "./"
});
// bs.reload("*.html");
bs.watch("./builds/**").on("change", bs.reload);
