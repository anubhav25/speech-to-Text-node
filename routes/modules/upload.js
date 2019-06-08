var multer = require("multer");
var path = require("path");

function setOptions(tag, nameOfFile, myreq, myres, fn) {
  var upload = multer({
    storage: multer.diskStorage({
      destination: function(req, file, callback) {
        callback(null, "./public/");
      },
      filename: function(req, file, callback) {
        var name = nameOfFile + path.extname(file.originalname).toLowerCase();
        callback(null, name);
      }
    })
  }).single(tag);

  upload(myreq, myres, fn);
}
module.exports = setOptions;
