export var expiredUrls = [
    '/src/assets/images/',
    '/uploads/',
    '/client.js'
];
export var setExpiredHeaders = function (res, maxAge, expiresDate) {
    if (maxAge === void 0) { maxAge = 2592000; }
    if (expiresDate === void 0) { expiresDate = 2592000000; }
    res.setHeader('Cache-Control', "public, max-age=" + maxAge);
    res.setHeader('Expires', new Date(Date.now() + expiresDate).toUTCString());
};
