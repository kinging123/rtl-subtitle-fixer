var express = require("express");
var bodyParser = require("body-parser");
var multipart = require('connect-multiparty');
var RTLize = require('./rtlize');
var multipartMiddleware = multipart();


var app = express();
app.use(express.static('public'))
app.use(bodyParser.json());
app.set('view engine', 'pug');

var server = app.listen(process.env.PORT || 8080, function () {
	var port = server.address().port;
	console.log("App now running on port", port);
});

app.get("/", function (req, res) {
	res.render('index'); // Pug template
});

app.post("/upload", function(req, res){
	var { name, subtitles } = req.body;
	subtitles = subtitles.replace(/\r\n/gi, `
`);
	var rtl_subtitles = RTLize(subtitles);
	// console.log(rtl_subtitles);
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(rtl_subtitles));
});

// CONTACTS API ROUTES BELOW