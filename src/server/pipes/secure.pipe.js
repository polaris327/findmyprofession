import { isSecure } from '../../main.server';
import { redirectRequest } from '../core';
import { DOMAIN_URL } from '../../main.config';
export var secureRedirectPipe = function (req, res, next) {
    isSecure && !/https/.test(req.protocol) ? redirectRequest(res, "" + DOMAIN_URL + req.url) : next();
};
