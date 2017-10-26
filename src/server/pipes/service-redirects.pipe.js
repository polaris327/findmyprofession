import { SERVER_REDIRECTS_ROUTES_MAP } from '../routes/service-redirects.model';
import { DOMAIN_URL } from '../../main.config';
import { CoreUtilitiesService } from '../../app/core/services/core-utilities.service';
export var serviceRedirectPipeline = function (req, res, next) {
    var path = CoreUtilitiesService.removeTrallingSlash(req.path);
    if (SERVER_REDIRECTS_ROUTES_MAP.get(path)) {
        res.redirect(301, "" + DOMAIN_URL + SERVER_REDIRECTS_ROUTES_MAP.get(path));
    }
    else {
        next();
    }
};
