import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import * as cors from 'cors';
import { ServerAppModule } from './app/server-app.module';
import { ngExpressEngine } from './modules/ng-express-engine/express-engine';
import { enableProdMode } from '@angular/core';
import { BACK_URL, DOMAIN_URL, PORT, PROD_FILE_DIRECTORY } from './main.config';
import { FRONT_ROUTES } from './server/routes/front-routes.model';
import { frontPipeline } from './server/pipes/front-routes.pipe';
import { calendlyPipeline } from './server/pipes/calendly.pipe';
import { serviceRedirectPipeline } from './server/pipes/service-redirects.pipe';
import { siteMapGenerator } from './server/site-map-generator';
import { secureRedirectPipe } from './server/pipes/secure.pipe';
import { hostRedirectPipe } from './server/pipes/host.pipe';
import { BACK_ROUTES } from './server/routes/back-routes.model';
import { UrlScheme } from "./server/core.model";
import { addGzipEncoding, getServerAddress } from "./server/core";
import { expiredUrls, setExpiredHeaders } from './server/expired-headers';
var fs = require('fs');
var httpsApp = require('https');
var robots = require('./robots.txt');
var sitemap = require('./sitemap.xml');
var bodyParser = require('body-parser');
var httpProxy = require('http-proxy');
var path = require('path');
var request = require('request');
enableProdMode();
var app = express();
// create application/json parser
var jsonParser = bodyParser.json();
var isDevMode = Boolean(process.env.isDev);
export var BACKEND_API_URL = BACK_URL;
var port = PORT.front;
app.use(cors());
/**
 * Setting routes for expires static content
 */
expiredUrls.forEach(function (url) {
    app.get(new RegExp(url), function (req, res, next) {
        setExpiredHeaders(res);
        next();
    });
});
app.get(/\/analytics/, function (req, res) {
    var options = {
        url: "https://www.google-analytics.com/ga.js",
        method: 'GET',
        headers: {
            'Content-Type': 'text/javascript'
        }
    };
    request(options, function (err, response, body) {
        if (err) {
            return res.status(500).json({ message: 'Inner server error.' });
        }
        res.setHeader('Cache-Control', "public, max-age=2592000");
        res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
        res.setHeader('Vary', 'Accept-Encoding');
        return res.contentType('text/javascript').send(body);
    });
});
app.get(/\.js|\.svg/, function (req, res, next) {
    var exceptEncoding = BACK_ROUTES.concat([
        'sprite-anim.svg'
    ]);
    addGzipEncoding(req, res, exceptEncoding);
    next();
});
export var isSecure = true;
var httpsConfig = {};
try {
    var path_1 = PROD_FILE_DIRECTORY + 'cert/';
    httpsConfig.ca = fs.readFileSync(path_1 + "ca_bundle.crt");
    httpsConfig.cert = fs.readFileSync(path_1 + "certificate.crt");
    httpsConfig.key = fs.readFileSync(path_1 + "private.key");
}
catch (e) {
    console.log('Secure reading error: ', e.message);
    isSecure = false;
}
var backServerOptions = {
    port: 8080,
    scheme: UrlScheme.http,
    ip: '108.179.218.140'
};
var httpProxyOption = {
    target: getServerAddress(backServerOptions)
};
var backRequests = /\/api\/v1/;
var proxy = httpProxy.createProxyServer(httpProxyOption);
/**
 * For backend request proxy
 */
app.get(backRequests, function (req, res) { return proxy.web(req, res, backServerOptions); });
app.post(backRequests, function (req, res) { return proxy.web(req, res, backServerOptions); });
app.put(backRequests, function (req, res) { return proxy.web(req, res, backServerOptions); });
app.delete(backRequests, function (req, res) { return proxy.web(req, res, backServerOptions); });
var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript',
    json: 'application/json'
};
var url = 'http://www.findmyprofession.com:8080';
app.get(/\/bundles\/admin\//, function (req, res) {
    return request.get(url + req.path).pipe(res.contentType(mime[path.extname(req.path).slice(1)] || mime.json));
});
app.get('/admin', function (req, res) {
    return request.get(url + req.path).pipe(res.contentType('text/html'));
});
var adminPipe = /\/admin/;
app.get(adminPipe, function (req, res) { return request.get(url + req.path).pipe(res); });
app.post(adminPipe, function (req, res) { return request.post(url + req.path).pipe(res); });
app.delete(adminPipe, function (req, res) { return request.delete(url + req.path).pipe(res); });
app.put(adminPipe, function (req, res) { return request.put(url + req.path).pipe(res); });
app.get(/\/uploads/, function (req, res) { return request.get(url + req.path).pipe(res); });
if (!isDevMode) {
    app.use(secureRedirectPipe);
    app.use(hostRedirectPipe);
}
/**
 * For server side rendering
 */
app.engine('html', ngExpressEngine({
    bootstrap: ServerAppModule
}));
app.set('view engine', 'html');
app.set('views', 'src');
app.use('/', express.static('dist', { index: false }));
/**
 * Endpoint to proxy calendly create
 */
app.post('/calendly/create', jsonParser, calendlyPipeline);
/**
 * Endpoint to generate new sitemap
 */
app.post('/generate-sitemap', siteMapGenerator);
app.use(serviceRedirectPipeline);
FRONT_ROUTES.forEach(function (route) {
    app.get(route, function (req, res) { return frontPipeline(req, res); });
});
// For certificate approval
app.use('/.well-known/acme-challenge', express.static('.well-known/acme-challenge'));
if (isSecure && !isDevMode) {
    httpsApp.createServer(httpsConfig, app)
        .listen(443);
}
/**
 * Redirect for bad url
 */
app.get('^*$', function (req, res) { return res.redirect(308, DOMAIN_URL + "/404"); });
app.listen(port, function () {
    if (isDevMode) {
        console.log("Listening port: " + port);
    }
});
