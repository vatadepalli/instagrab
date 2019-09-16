var fs = require("fs");
var request = require("request");

module.exports = Download = (uri, filename, callback) => {
  request.head(uri, function(err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);

    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });

  console.log("_______________ DEBUG _____________________-");
  console.log("********************************************************");
  //   console.log(images);
};
