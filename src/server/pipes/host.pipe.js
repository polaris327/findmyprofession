import { redirectRequest } from '../core';
import { DOMAIN_URL } from '../../main.config';
export var hostRedirectPipe = function (req, res, next) {
    var host = req.header('host');
    if (host && !host.match(/^www\..*/i)) {
        redirectRequest(res, "" + DOMAIN_URL + req.url);
    }
    else {
        next();
    }
};
