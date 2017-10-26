export enum UrlScheme {
  'http'  = 1,
  'https' = 2
}

export interface ServerOptions {
  ip: string;
  port: number;
  scheme: UrlScheme;
}