export interface IAppConfig {
  facebookLink: string;
  twitterLink: string;
  linkedInkLink: string;
  readonly calendly_url?: string;
  readonly recaptcha_key: string;
  readonly recaptcha_link: string;
  readonly google_analytics_id: string;
}

export const APP_CONFIG: IAppConfig = {
  facebookLink: 'https://www.facebook.com/findmyprofession',
  twitterLink: 'https://twitter.com/fmpdaily',
  linkedInkLink: 'https://www.linkedin.com/company/find-my-profession',
  calendly_url: 'https://calendly.com/findmyprofession/',
  recaptcha_key: '6Lc9WyUUAAAAAPa5DQsfQDilNgYHZjJshndy7RuI',
  recaptcha_link: 'https://www.google.com/recaptcha/api.js',
  google_analytics_id: 'UA-72462215-1'
};