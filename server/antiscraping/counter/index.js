'use strict';

var winston = require('winston');


module.exports = Counter;


////////////

function Counter(delay) {
    this._delay = delay;

    this._buffer = [];
}


Counter.prototype.incr = function incrFn() {
    var timestamp = new Date().getTime();

    this._buffer.push(timestamp);
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
