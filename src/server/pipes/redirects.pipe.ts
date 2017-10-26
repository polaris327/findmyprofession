import {backPipeline} from './back-routes.pipe';
import {BACK_ROUTES} from '../routes/back-routes.model';
import {Request, Response, NextFunction} from 'express';

export const apiPipeline = (req: Request, res: Response, next: NextFunction) => {
  if(BACK_ROUTES.some((route: string) => req.url.includes(route))) {
    return backPipeline(req, res);
  } else {
    next();
  }
};