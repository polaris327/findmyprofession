import * as path from 'path';
import * as fs from 'fs';
import { DOMAIN_URL, PROD_FILE_DIRECTORY } from '../main.config';
var request = require('request');
var URL = require('url');
var isDevMode = Boolean(process.env.isDev);
var routes = [
    '/',
    '/resume-makeover',
    '/job-interview-prep',
    '/career-finder',
    '/linkedin-profile-makeover',
    '/cover-letter-service',
    '/testimonials',
    '/contact-us',
    '/login',
    '/faq',
    '/about-us',
    '/terms-of-use',
    '/linkedin',
    '/resume-cover-letter',
    '/interviewing',
    '/job-search',
    '/career-advice',
    '/password-reset'
];
export var siteMapGenerator = function (req, res) {
    var filePath = path.join(isDevMode ? __dirname : PROD_FILE_DIRECTORY, 'sitemap.xml');
    if (fs.existsSync(filePath)) {
        var options = {
            url: DOMAIN_URL + "/api/v1/blog/slugs",
            method: 'GET'
        };
        request(options, function (err, response, body) {
            if (err) {
                return res.status(500).json({ message: 'Inner server error.' });
            }
            writeToFile(JSON.parse(body), DOMAIN_URL, filePath, res);
        });
    }
    else {
        return res.status(404).json({ message: 'File is not exist.' });
    }
    function writeToFile(blogSlugs, domain, filePath, res) {
        var blogList = blogSlugs && blogSlugs.map ? blogSlugs
            .map(function (element) { return wrapUrl(domain + "/career-advice/" + URL.parse(element.url).pathname); }) : [];
        var frontRoutes = routes ? routes
            .map(function (element) { return wrapUrl("" + domain + element); }) : [];
        var fileBody = wrapSiteMapBody(joinArray(frontRoutes) + "\n" + joinArray(blogList));
        fs.writeFile(filePath, fileBody, function (err) {
            if (err) {
                return res.status(500).json('Error in writing to file.');
            }
            fs.readFile(filePath, 'utf-8', function (err, data) {
                if (err) {
                    return res.json({ message: "Error in file read. " + err.ERROR });
                }
                return res.json(data);
            });
        });
    }
    function wrapUrl(url) {
        return "<url><loc>" + url + "</loc></url>";
    }
    function joinArray(list) {
        return list.join('\n');
    }
    function wrapSiteMapBody(data) {
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n    <urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n    xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n    xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9\n            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">" + data + "</urlset>";
    }
};
