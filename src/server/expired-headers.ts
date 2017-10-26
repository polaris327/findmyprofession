import {Response} from 'express';

export const expiredUrls: Array<string> = [
  '/src/assets/images/',
  '/uploads/',
  '/client.js'
];

export const setExpiredHeaders = (res: Response, maxAge: number = 2592000, expiresDate: number = 2592000000) => {
  res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
  res.setHeader('Expires', new Date(Date.now() + expiresDate).toUTCString());
};