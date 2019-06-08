var app = require("express").Router();
var fs = require("fs");
var convert = require("./convert");

module.exports = (server, siofu) => {
  var io = require("socket.io").listen(server);
  io.on("connection", function(socket) {
    console.log("A new");
    var uploader = new siofu();
    uploader.dir = "./public";
    uploader.listen(socket);
    uploader.on("saved", async obj => {
      console.log(obj);
      try {
        const audioBytes = fs
          .readFileSync(obj.file.pathName)
          .toString("base64");
        console.log(obj.file.pathName);
        var data = await convert(audioBytes);
        console.log(data);
        socket.emit("message", {
          from: "me",
          time: new Date(Date.now()).toLocaleString(),
          message: data
        });
        setTimeout(() => {
          socket.emit("message", {
            from: "server",
            time: new Date(Date.now()).toLocaleString(),
            message: data
          });
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    });
    socket.on("disconnect", function(a) {
      console.log(a, "disconnected");
    });
  });

  return app;
};
