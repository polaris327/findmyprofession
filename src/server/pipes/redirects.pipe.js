import { backPipeline } from './back-routes.pipe';
import { BACK_ROUTES } from '../routes/back-routes.model';
export var apiPipeline = function (req, res, next) {
    if (BACK_ROUTES.some(function (route) { return req.url.includes(route); })) {
        return backPipeline(req, res);
    }
    else {
        next();
    }
};
