#! /usr/bin/env node

'use strict';

var antiscraping = require('./antiscraping'),
    errorHandler = require('errorhandler'),
    express = require('express'),
    latency = require('./latency'),
    morgan = require('morgan'),
    winston = require('winston');

winston.level = 'debug';


var config = require('./config');


var app = express();

// Add middlewares
app.use(morgan('combined'));
app.use('/favicon.ico', function(req, res) { res.sendStatus(404);}); // Ignore favicon
app.use(latency(config.latency));
app.use(antiscraping(config.antiscraping));
app.use(errorHandler());

// Add endpoint
var count = 0;
app.use(function(req, res) {
    res.status(200).send('(' + count + ') You have reached the server');

    ++count;
});

// Start server
app.listen(config.port, function (err) {
    if (err) return winston.error(err);

    winston.info('Server is available at http://localhost:%d', config.port);
});
