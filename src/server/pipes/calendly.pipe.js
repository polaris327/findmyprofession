var request = require('request');
import { BACK_URL } from '../../main.config';
export var calendlyPipeline = function (req, res) {
    var options = {
        url: BACK_URL + "/api/v1/calendly",
        method: 'POST',
        json: true,
        body: req.body || { message: 'No body' }
    };
    request(options, function (err, response, body) {
        if (err) {
            return res.status(500).json({ message: 'Inner server error.' });
        }
        return res.json(body);
    });
};
