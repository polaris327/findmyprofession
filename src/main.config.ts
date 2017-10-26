import {ConfigEntity} from './app/core/models/core.model';

export const PORT: ConfigEntity<number> = {
  front: process.env.PORT || 80,
  back: 8080
};
const isDevMode: boolean = !!process.env.isDev;

export const PROTOCOL: ConfigEntity<string> = {
  front: isDevMode ? 'http://' : 'https://',
  back:  'http://'
};

export const DOMAIN: string = isDevMode ? `localhost${PORT.front}` :'www.findmyprofession.com';
export const DOMAIN_URL: string = `${PROTOCOL.front}${DOMAIN}`;

export const BACK_URL: string = `${PROTOCOL.back}${isDevMode ? '192.168.88.190' : DOMAIN}${parsePort(PORT.back)}`;
// export const FRONT_BACK_URL: string = `${PROTOCOL.front}${DOMAIN}${parsePort(PORT.front)}/api/v1`;
/**
 * Temporary , need to fix it
 * @type {string}
 */
export const FRONT_BACK_URL: string = `https://www.findmyprofession.com/api/v1`;

export const PROD_FILE_DIRECTORY: string = '/home/jgaockmy/www/fmp_front/dist/';

export function parsePort(protocol: number): string {
  if (protocol === 80) {
    return '';
  } else {
    return `:${protocol}`;
  }
}