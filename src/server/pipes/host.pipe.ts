import { NextFunction, Request, Response} from "express";
import {redirectRequest} from '../core';
import {DOMAIN_URL} from '../../main.config';

export const hostRedirectPipe = (req: Request, res: Response, next: NextFunction) => {
  const host: string | undefined = req.header('host');
  if (host && !host.match(/^www\..*/i)) {
    redirectRequest(res, `${DOMAIN_URL}${req.url}`);
  } else {
    next();
  }
};
