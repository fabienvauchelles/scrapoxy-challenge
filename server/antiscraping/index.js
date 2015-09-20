'use strict';

var _ = require('lodash'),
    Counter = require('./counter'),
    winston = require('winston');


module.exports = middleware;


////////////

function middleware(config) {
    var blacklistedIPs = {},
        counters = {};

    return function middlewareImpl(req, res, next) {
        var ip = req.ip,
            now = new Date().getTime();

        var blacklistedIP = blacklistedIPs[ip];
        if (blacklistedIP && blacklistedIP.start + blacklistedIP.delay > now) {
            blacklistedIP.delay *= 2;

            return res.status(503).send('blacklisted IP ' + ip + ' for ' + blacklistedIP.delay + 'ms (renew)');
        }

        delete blacklistedIPs[ip];

        var counter = counters[ip];
        if (!counter) {
            counter = new Counter(config.samplingDelay);
            counters[ip] = counter;
        }

        counter.incr();

        if (counter.getCount() > config.maxRequests) {
            blacklistedIP = {
                start: new Date().getTime(),
                delay: config.blacklistStartDelay,
            };

            blacklistedIPs[ip] = blacklistedIP;

            return res.status(503).send('blacklisted IP ' + ip + ' for ' + blacklistedIP.delay + 'ms (create)');
        }

        next();
    };
}
