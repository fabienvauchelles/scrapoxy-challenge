'use strict';

var _ = require('lodash'),
    Counter = require('./counter'),
    winston = require('winston');


module.exports = middleware;


////////////

function middleware(config) {
    var counters = {};

    return function middlewareImpl(req, res, next) {
        var ip = req.ip;

        var counter = getOrCreateCounter(ip);
        if (counter.getCount() > 0) {
            winston.info('[antiscraping] blacklisted IP %s', ip);

            var delay = counter.incrDelay();

            res.status(503).send('blacklisted IP ' + ip + ' for ' + delay + 'ms');
        }
        else {
            counter.incrCounter();
            counter.clearDelay();

            next();
        }
    };


    ////////////

    function getOrCreateCounter(ip) {
        var counter = counters[ip];
        if (counter) {
            return counter;
        }

        counter = new Counter(
            config.startDelay,
            config.decreaseDelay
        );
        counters[ip] = counter;

        return counter;
    }
}
