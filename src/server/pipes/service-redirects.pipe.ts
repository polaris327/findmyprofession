import {Request, Response, NextFunction} from 'express';

import {SERVER_REDIRECTS_ROUTES_MAP} from '../routes/service-redirects.model';
import {DOMAIN_URL} from '../../main.config';
import {CoreUtilitiesService} from '../../app/core/services/core-utilities.service';

export const serviceRedirectPipeline = (req: Request, res: Response, next: NextFunction) => {
  const path: string = CoreUtilitiesService.removeTrallingSlash(req.path);
  if (SERVER_REDIRECTS_ROUTES_MAP.get(path)) {
    res.redirect(301, `${DOMAIN_URL}${SERVER_REDIRECTS_ROUTES_MAP.get(path)}`);
  } else {
    next();
  }
};