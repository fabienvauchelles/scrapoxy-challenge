'use strict';

var winston = require('winston');


module.exports = Counter;


////////////

function Counter(startDelay) {
    this._startDelay = startDelay;
    this._delay = startDelay;

    this._buffer = [];
}


Counter.prototype.incrCounter = function incrCounterFn() {
    var timestamp = new Date().getTime();

    this._buffer.push(timestamp);
};


Counter.prototype.incrDelay = function incrDelayFn() {
    this._delay = this._delay * 2;

    winston.debug('[Counter] increment delay to %d', this._delay);

    return this._delay;
};


Counter.prototype.clearDelay = function clearDelayFn() {
    this._delay = this._startDelay;

    winston.debug('[Counter] clear delay to %d', this._delay);

    return this._delay;
};


Counter.prototype.getCount = function getCountFn() {
    var self = this;

    clear();

    return self._buffer.length;


    ////////////

    function clear() {
        if (self._buffer.length <= 0) {
            return;
        }

        var now = new Date().getTime(),
            limit = now - self._delay;

        var i;
        for (i = 0; i < self._buffer.length; ++i) {
            var timestamp = self._buffer[i];
            if (timestamp >= limit) {
                break;
            }
        }

        self._buffer.splice(0, i);
    }
};
