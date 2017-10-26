export interface IScheduleEvent {
  readonly id?: number;

  readonly event: string;

  readonly email: string;

  readonly link: string;

  start_time: string;
  end_time: string;

  readonly duration: number;

  readonly canceled: boolean;

  readonly invitee_name: string;
  readonly invitee_email: string;

  readonly location: string;

  readonly canceler_name?: string;
  readonly cancel_reason?: string;

  readonly name?: string;

  status: string;

  description?: string;
}

export const PENDING_STATUS: string = 'Pending';
export const COMPLETED_STATUS: string = 'Completed';
export const CANCEL_STATUS: string = 'Canceled';

export interface IScheduleCallsResponse {
  available: Array<IScheduleCallService>;
  pending: Array<IScheduleEvent>;
  completed: Array<IScheduleEvent>;
  canceled: Array<IScheduleEvent>;
}

export interface IScheduleCallService {
  id: number;
  name: string;
  link: string;
  calendlyLink?: string;
}