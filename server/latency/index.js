'use strict';


module.exports = middleware;


////////////

function middleware(delay) {
    return function middlewareImpl(req, res, next) {
        setTimeout(next, delay);
    };
}
