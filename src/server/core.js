var fs = require('fs');
export var redirectRequest = function (res, url, statusCode) {
    if (statusCode === void 0) { statusCode = 301; }
    return res.redirect(statusCode, url);
};
export var getServerAddress = function (options) { return options.scheme + "://" + options.ip + ":" + options.port; };
export var addGzipEncoding = function (req, res, exceptUrls) {
    if (exceptUrls === void 0) { exceptUrls = []; }
    if (req.acceptsEncodings('gzip') && !exceptUrls.some(function (url) { return req.path.includes(url); })) {
        req.url = req.url + ".gz";
        res.set('Content-Encoding', 'gzip');
        if (/\.svg/.test(req.path)) {
            res.header('Content-Type', 'image/svg+xml');
        }
        if (/client/.test(req.path) || /\.svg/.test(req.path)) {
            res.header('Vary', 'Accept-Encoding');
        }
    }
};
