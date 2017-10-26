export interface IJobResponse {
  count: number;
  pages: number;
  jobs: Array<IJobEntity>;
}

export interface IJobQueryParams {
  category: string;
  page: number | string;
  filter?: string;
}

export interface IJobEntity {
  readonly id: number;
  added_by: string;
  company: string;
  date: string;
  link: string;
  position: string;
  section: string;
  status: string;
  attachment: string;
  attachment_name?: string;
  checked?: boolean;
  linkForAvatar?: string;
  applied_date?: string;
}

export interface IPipeEntity {
  value?: string;
  title: string;
}

export interface IStatusEntity {
  liked: Array<string>;
  applied: Array<string>;
}

export interface ISortEntity {
  liked: Array<IPipeEntity>;
  applied: Array<IPipeEntity>;
}

export interface IJobsEntity {
  liked: Array<IJobEntity>;
  applied: Array<IJobEntity>;
}

export interface IJobsCount {
  liked: number;
  applied: number;
}

export interface IJobsPage {
  liked: number;
  applied: number;
}

const notInterested: IPipeEntity = {
  title: 'Not Interested',
  value: 'nointerest'
};

export const SORT_OPTIONS: ISortEntity = {
  liked: [
    {
      title: 'All'
    },
    {
      title: 'Pending',
      value: 'pending'
    },
    {
      title: 'Ready',
      value: 'ready'
    },
    {
      title: 'Need Info',
      value: 'need-info'
    },
    notInterested
  ],
  applied: [
    {
      title: 'All'
    },
    {
      title: 'Applied',
      value: 'applied'
    },
    {
      title: 'Interview',
      value: 'interview'
    },
    {
      title: 'Rejected',
      value: 'rejected'
    },
    {
      title: 'Offer',
      value: 'offer'
    },
    notInterested
  ]
};

export const STATUSES: IStatusEntity = {
  liked: [
    'Pending',
    'Ready',
    'Need Info',
    'Applied',
    'Not Interested'
  ],
  applied: [
    'Pending',
    'Applied',
    'Interview',
    'Offer',
    'Rejected',
    'Not Interested'
  ]
};