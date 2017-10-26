import {Request, Response} from 'express';

const request = require('request');
import {BACK_URL} from '../../main.config';

export const calendlyPipeline = (req: Request, res: Response) => {
  const options: any = {
    url: `${BACK_URL}/api/v1/calendly`,
    method: 'POST',
    json: true,
    body: req.body || {message: 'No body'}
  };

  request(options, (err, response, body) => {
    if (err) {
      return res.status(500).json({message: 'Inner server error.'});
    }
    return res.json(body);
  });
};