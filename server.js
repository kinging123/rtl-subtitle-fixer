var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var server = app.listen(process.env.PORT || 8080, function () {
	var port = server.address().port;
	console.log("App now running on port", port);
});

app.get("/", function (req, res) {
	res.send('HEyyyy');
});

// CONTACTS API ROUTES BELOW