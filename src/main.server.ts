import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import * as cors from 'cors';

import {Express, NextFunction, Request, Response} from "express";

import {ServerAppModule} from './app/server-app.module';
import {ngExpressEngine} from './modules/ng-express-engine/express-engine';
import {enableProdMode} from '@angular/core';
import {BACK_URL, DOMAIN_URL, PORT, PROD_FILE_DIRECTORY} from './main.config';
import {FRONT_ROUTES} from './server/routes/front-routes.model';
import {frontPipeline} from './server/pipes/front-routes.pipe';
import {calendlyPipeline} from './server/pipes/calendly.pipe';
import {serviceRedirectPipeline} from './server/pipes/service-redirects.pipe';
import {siteMapGenerator} from './server/site-map-generator';
import {secureRedirectPipe} from './server/pipes/secure.pipe';
import {hostRedirectPipe} from './server/pipes/host.pipe';
import {BACK_ROUTES} from './server/routes/back-routes.model';
import {ServerOptions, UrlScheme} from "./server/core.model";
import {addGzipEncoding, getServerAddress} from "./server/core";
import {expiredUrls, setExpiredHeaders} from './server/expired-headers';

const fs = require('fs');
const httpsApp = require('https');
const robots = require('./robots.txt');
const sitemap = require('./sitemap.xml');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');
const path = require('path');
const request = require('request');

enableProdMode();
const app: Express = express();
// create application/json parser
const jsonParser = bodyParser.json();

const isDevMode: boolean = Boolean(process.env.isDev);
export const BACKEND_API_URL: string = BACK_URL;
const port = PORT.front;

app.use(cors());

/**
 * Setting routes for expires static content
 */
expiredUrls.forEach((url: string) =>{
  app.get(new RegExp(url), (req: Request, res: Response, next: NextFunction) => {
    setExpiredHeaders(res);
    next();
  });
});

app.get(/\/analytics/, (req: Request, res: Response) => {
  const options: any = {
    url: `https://www.google-analytics.com/ga.js`,
    method: 'GET',
    headers: {
      'Content-Type': 'text/javascript'
    }
  };

  request(options, (err, response, body) => {
    if (err) {
      return res.status(500).json({message: 'Inner server error.'});
    }
    res.setHeader('Cache-Control', `public, max-age=2592000`);
    res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
    res.setHeader('Vary', 'Accept-Encoding');
    return res.contentType('text/javascript').send(body);
  });
});

app.get(/\.js|\.svg/, (req: Request, res: Response, next: NextFunction) => {
  const exceptEncoding: Array<string> = [
    ...BACK_ROUTES,
    'sprite-anim.svg'
  ];
  addGzipEncoding(req, res, exceptEncoding);
  next();
});

export let isSecure: boolean = true;
const httpsConfig: any = {};
try {
  const path: string = PROD_FILE_DIRECTORY + 'cert/';
  httpsConfig.ca = fs.readFileSync(`${path}ca_bundle.crt`);
  httpsConfig.cert = fs.readFileSync(`${path}certificate.crt`);
  httpsConfig.key = fs.readFileSync(`${path}private.key`);
} catch (e) {
  console.log('Secure reading error: ', e.message);
  isSecure = false;
}

const backServerOptions: ServerOptions = {
  port: 8080,
  scheme: UrlScheme.http,
  ip: '108.179.218.140'
};

const httpProxyOption: any = {
  target: getServerAddress(backServerOptions)
};

const backRequests: RegExp = /\/api\/v1/;
const proxy = httpProxy.createProxyServer(httpProxyOption);

/**
 * For backend request proxy
 */
app.get(backRequests, (req: Request, res: Response) => proxy.web(req, res, backServerOptions));
app.post(backRequests, (req: Request, res: Response) => proxy.web(req, res, backServerOptions));
app.put(backRequests, (req: Request, res: Response) => proxy.web(req, res, backServerOptions));
app.delete(backRequests, (req: Request, res: Response) => proxy.web(req, res, backServerOptions));

const mime: any = {
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

const url: string = 'http://www.findmyprofession.com:8080';

app.get(/\/bundles\/admin\//, (req: Request, res: Response) =>
  request.get(url + req.path).pipe(res.contentType(mime[path.extname(req.path).slice(1)] || mime.json)));

app.get('/admin', (req: Request, res: Response) =>
  request.get(url + req.path).pipe(res.contentType('text/html')));

const adminPipe: RegExp = /\/admin/;
app.get(adminPipe, (req: Request, res: Response) => request.get(url + req.path).pipe(res));
app.post(adminPipe, (req: Request, res: Response) => request.post(url + req.path).pipe(res));
app.delete(adminPipe, (req: Request, res: Response) => request.delete(url + req.path).pipe(res));
app.put(adminPipe, (req: Request, res: Response) => request.put(url + req.path).pipe(res));

app.get(/\/uploads/, (req: Request, res: Response) => request.get(url + req.path).pipe(res));

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

app.use('/', express.static('dist', {index: false}));

/**
 * Endpoint to proxy calendly create
 */
app.post('/calendly/create', jsonParser, calendlyPipeline);

/**
 * Endpoint to generate new sitemap
 */
app.post('/generate-sitemap', siteMapGenerator);

app.use(serviceRedirectPipeline);

FRONT_ROUTES.forEach((route: string) => {
  app.get(route, (req: Request, res: Response) => frontPipeline(req, res));
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
app.get('^*$', (req: Request, res: Response) => res.redirect(308, `${DOMAIN_URL}/404`));

app.listen(port, () => {
  if (isDevMode) {
    console.log(`Listening port: ${port}`);
  }
});
