import { NextFunction, Request, Response} from "express";
import {isSecure} from '../../main.server';
import {redirectRequest} from '../core';
import {DOMAIN_URL} from '../../main.config';

export const secureRedirectPipe = (req: Request,res: Response, next: NextFunction) => {
  isSecure && !/https/.test(req.protocol) ? redirectRequest(res, `${DOMAIN_URL}${req.url}`) : next();
};
