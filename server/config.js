'use strict';

var _ = require('lodash');


module.exports = _.merge({

    port: 10010,

    latency: 100,

    antiscraping: {
        startDelay: 200,
    },

}, require('./config.secret'));
