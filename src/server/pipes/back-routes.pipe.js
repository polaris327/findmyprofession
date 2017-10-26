import { BACKEND_API_URL } from '../../main.server';
var request = require('request');
export var backPipeline = function (req, res) {
    var url = BACKEND_API_URL + req.url;
    var r = null;
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
    return req.pipe(r).pipe(res);
};
