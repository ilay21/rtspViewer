const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User')
const jwt = require('jwt-simple');
const login = require('./services/login');
const register = require('./services/register');
const rtspurl = require('./services/rtspurl');

const app = express();

app.use(cors());
app.use(bodyParser.json());

function unauthorizedResponse(res, message) {
	return res.status(401).send({
		message
	});
}

function checkAuth(req, res, next) {
	if (!req.header('Authorization')) return unauthorizedResponse(res, 'Unauthorized - missing auth header');

	let token = req.header('Authorization');
	let payload = jwt.decode(token, '123456');
    if (!payload) return unauthorizedResponse(res, 'Auth header invalid');
    req.userId = payload.sub;
    next();
}

app.post('/register', register)
app.post('/login', login)
app.post('/rtspurl', checkAuth, rtspurl)

// serve all asset files from necessary directories
app.use("/js", express.static(__dirname + "/../frontend/js/"));
app.use("/lib", express.static(__dirname + "/../frontend/node_modules/"));
app.use("/css", express.static(__dirname + "/../frontend/css/"));
app.use("/views", express.static(__dirname + "/../frontend/views/"));

// serve index.html for all remaining routes, in order to leave routing up to angular
app.all("/*", function (req, res, next) {
	res.sendFile("index.html", {
		root: __dirname + "/../frontend/"
	});
});
mongoose.connect('mongodb://admin:admin@ds137464.mlab.com:37464/rtspview', err => {
	if (!err) console.log('connected to mongo');
})

app.listen(3000);
