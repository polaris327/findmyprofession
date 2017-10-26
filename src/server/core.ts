import {Request, Response} from 'express';
import {ServerOptions} from "./core.model";

const fs = require('fs');

export const redirectRequest = (res: Response, url: string, statusCode: number = 301) =>
    res.redirect(statusCode, url);

export const getServerAddress = (options: ServerOptions) => `${options.scheme}://${options.ip}:${options.port}`;

export const addGzipEncoding = (req: Request, res: Response, exceptUrls: Array<string> = []) => {
  if (req.acceptsEncodings('gzip') && !exceptUrls.some((url: string) => req.path.includes(url))){
    req.url = `${req.url}.gz`;
    res.set('Content-Encoding', 'gzip');
    if (/\.svg/.test(req.path)) {
      res.header('Content-Type', 'image/svg+xml');
    }
    if (/client/.test(req.path) || /\.svg/.test(req.path)) {
      res.header('Vary', 'Accept-Encoding');
    }
  }
};