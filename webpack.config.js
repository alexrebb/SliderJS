const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src/JS"),
  entry: "./script.js",
  target: "web",
  output: {
    filename: "arsliderjs.js",
    path: path.resolve(__dirname, "dist"),
    library: "SliderJS",
    libraryExport: "default",
    libraryTarget: "this",
  },
};
