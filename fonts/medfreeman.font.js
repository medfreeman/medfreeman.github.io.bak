const path = require("path")

if ( !String.prototype.includes ) {
  String.prototype.includes = function(search, start) {
    "use strict"
    if (typeof start !== "number") {
      start = 0
    }

    if (start + search.length > this.length) {
      return false
    } else {
      return this.indexOf(search,start) !== -1
    }
  }
}

module.exports = {
  "files": [
    path.resolve(__dirname, "../node_modules/mdi/icons/svg/react.svg"),
    path.resolve(__dirname, "../node_modules/material-design-icons/action/svg/production/ic_done_all_24px.svg"),
  ],
  "fontName": "Medcons",
  "cssTemplate": path.resolve(__dirname, "medfreeman.css.hbs"),
  "classPrefix": "mf-",
  "baseSelector": ".mf-icons",
  "rename": function(filename) {
    if (filename.includes("material-design-icons")) {
      return path.basename(filename, "_24px.svg").replace("ic_", "")
    }
    return path.basename(filename, ".svg")
  },
  "fixedWidth": true,
  "types": ["eot", "woff2", "woff", "ttf"],
}
