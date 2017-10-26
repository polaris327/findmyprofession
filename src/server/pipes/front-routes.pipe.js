export var frontPipeline = function (req, res) {
    res.render('../dist/index', {
        req: req,
        res: res
    }, function (err, html) {
        html = html.replace(/[\n\r]/g, '').replace(/<!---->/g, '').replace(/> </g, '><');
        res.setHeader('Cache-Control', "public, max-age=2592000");
        res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
        return res.status(/404/.test(req.path) ? 404 : 200).send(html);
    });
};
