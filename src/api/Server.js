const express = require('express');
const app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
// require('dotenv').load()
const port = process.env.PORT || 5000

app.use(cors());


app.use(express.json());

app.use(bodyParser.text());

app.use(bodyParser.raw());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

let routes = require('./product/routes')
routes(app);

app.use(function (req, res, next) {
	// res.setHeader('Access-Control-Allow-Origin', '*');
	// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	// res.setHeader('Access-Control-Allow-Credentials', true);
	// res.setHeader("Content-Type", "text/plain");
	// res.setHeader("Content-Type", "application/json");
	res.status(404).send({url: req.originalUrl + ' not found'})
	next();
});

app.listen(port, () => console.log(`Server started on port ${port}`));