var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var mongoose = require("mongoose");

mongoose.connect(MONGODB_URI);