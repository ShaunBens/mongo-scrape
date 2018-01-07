// var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var express = require("express");
var mongoose = require("mongoose");
// var request = require("request");

var PORT = process.env.PORT || 8080;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_2x3bc8b5:phjkvp1ic9voibo190ghadl1jg@ds237967.mlab.com:37967/heroku_2x3bc8b5";

// var db = require("./models");

var app = express();

//Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/disney-scraper" || "mongodb://heroku_2x3bc8b5:phjkvp1ic9voibo190ghadl1jg@ds237967.mlab.com:37967/heroku_2x3bc8b5", {
  useMongoClient: true
});

require("./routes/api-routes.js")(app);

app.listen(PORT, function() {
  console.log("App Running on Port " + PORT + " !");
});
