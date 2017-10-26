export interface IJobsUpdate {
  applied: number;
  info: number;
  pending: number;
}

export interface IUserUpdates {
  profile_complete: boolean;
  resume_uploaded: boolean;
  schedule_call: boolean;
  jobs: IJobsUpdate;
}

