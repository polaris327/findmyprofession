export var PORT = {
    front: process.env.PORT || 80,
    back: 8080
};
var isDevMode = !!process.env.isDev;
export var PROTOCOL = {
    front: isDevMode ? 'http://' : 'https://',
    back: 'http://'
};
export var DOMAIN = isDevMode ? "localhost" + PORT.front : 'www.findmyprofession.com';
export var DOMAIN_URL = "" + PROTOCOL.front + DOMAIN;
export var BACK_URL = "" + PROTOCOL.back + (isDevMode ? '192.168.88.190' : DOMAIN) + parsePort(PORT.back);
// export const FRONT_BACK_URL: string = `${PROTOCOL.front}${DOMAIN}${parsePort(PORT.front)}/api/v1`;
/**
 * Temporary , need to fix it
 * @type {string}
 */
export var FRONT_BACK_URL = "https://www.findmyprofession.com/api/v1";
export var PROD_FILE_DIRECTORY = '/home/jgaockmy/www/fmp_front/dist/';
export function parsePort(protocol) {
    if (protocol === 80) {
        return '';
    }
    else {
        return ":" + protocol;
    }
}
