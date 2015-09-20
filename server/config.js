'use strict';

var _ = require('lodash');


module.exports = _.merge({

    port: 10010,

    latency: 100,

    antiscraping: {
        samplingDelay: 1 * 1000,
        maxRequests: 10,
        blacklistStartDelay: 2000,
    },

}, require('./config.secret'));
