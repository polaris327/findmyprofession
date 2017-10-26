export const SERVER_REDIRECTS_ROUTES: ServiceRedirect[] = [
  {
    endpoint: '/coaching-services/career-finder',
    to: '/career-finder'
  },
  {
    endpoint: '/coaching-services/resume-makeover',
    to: '/resume-makeover'
  },
  {
    endpoint: '/coaching-services/cover-letter-writing',
    to: '/cover-letter-service'
  },
  {
    endpoint: '/coaching-services/linkedin-profile-makeover',
    to: '/linkedin-profile-makeover'
  },
  {
    endpoint: '/coaching-services/interview-training',
    to: '/job-interview-prep'
  },
  {
    endpoint: '/resume',
    to: '/resume-cover-letter'
  },
  {
    endpoint: '/coaching-services/linkedin-makeover',
    to: '/cover-letter-service'
  }
];

export interface ServiceRedirect {
  endpoint: string;
  to: string;
}

export const SERVER_REDIRECTS_ROUTES_MAP: Map<string, string> = new Map<string, string>();
SERVER_REDIRECTS_ROUTES.forEach((element: ServiceRedirect) => SERVER_REDIRECTS_ROUTES_MAP.set(element.endpoint, element.to));


