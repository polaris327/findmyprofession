import {Request, Response} from "express";

export const frontPipeline = (req: Request, res: Response) => {
  res.render('../dist/index', {
    req: req,
    res: res
  }, (err: any, html: any) => {
    html = html.replace(/[\n\r]/g, '').replace(/<!---->/g, '').replace(/> </g, '><');

    res.setHeader('Cache-Control', `public, max-age=2592000`);
    res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
    return res.status(/404/.test(req.path)  ? 404 : 200).send(html);
  });
};
