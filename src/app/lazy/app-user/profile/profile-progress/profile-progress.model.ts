export interface IProfileProgress {
  value: number;
  values: Object;
}

export interface IProgressTask {
  title: string;
  field: string;
}

export interface IProgressReference {
  tabId: string;
}

export interface IProgressReferenceEntity {
  key: string;
  value: IProgressReference;
}

export const PROGRESS_REFERENCES: Array<IProgressReferenceEntity> = [
  {
    key: 'reference',
    value: {
      tabId: 'profile-accordion-4'
    }
  },
  {
    key: 'work_experience_education',
    value: {
      tabId: 'profile-accordion-3'
    }
  },
  {
    key: 'questions',
    value: {
      tabId: 'profile-accordion-6'
    }
  },
  {
    key: 'profile',
    value: {
      tabId: 'profile-accordion-1'
    }
  },
  {
    key: 'career_preferences',
    value: {
      tabId: 'profile-accordion-2'
    }
  },
  {
    key: 'documents',
    value: {
      tabId: 'profile-accordion-5'
    }
  }
];