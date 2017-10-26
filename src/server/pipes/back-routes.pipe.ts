import {BACKEND_API_URL} from '../../main.server';
const request = require('request');

import {Request, Response} from "express";

export const backPipeline = (req: Request, res: Response) => {
  const url: string = BACKEND_API_URL + req.url;
  let r: Response | null = null;
  switch (req.method) {
    case 'POST':
      r = request.post({
        uri: url,
        json: req.body
      });
      break;
    case 'GET':
      r = request(url);
      break;
    case 'PUT':
      r = request.put({
        uri: url,
        json: req.body
      });
      break;
    case 'DELETE':
      r = request.delete({
        uri: url,
        json: req.body
      });
      break;
  }
  return (<any>req.pipe(r)).pipe(res);
};