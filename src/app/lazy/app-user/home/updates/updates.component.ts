import {Component, Input, ViewEncapsulation} from '@angular/core';

import {IUserUpdates} from './updates.model';
import {IJobResponse} from '../../jobs/user-jobs.model';

import {UserJobsService} from '../../jobs/user-jobs.service';
@Component({
  selector: 'fmp-home-updates-component',
  templateUrl: 'updates.html',
  styles: [require('./updates.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class HomeUpdatesComponent {

  @Input()
  updates: IUserUpdates;

  public added_days: number = 0;
  constructor(private jobsService: UserJobsService) {
    
    this.jobsService.getJobs('liked',0)
    .subscribe(
    (response: IJobResponse) => {
      this.added_days = this.Cal_added_day(response);
    }); 
  }

  private Cal_added_day(obj: IJobResponse): number {
    var oneDay = 24*60*60*1000;
    var now =  new Date(); 
    var latest;
    latest = new Date(Math.max.apply(null, obj.jobs.map(function(e) {
       return new Date(e.date);
    })));
    var diffDays = Math.round(Math.abs((now.getTime() - latest.getTime())/(oneDay)));
    return diffDays;
  }
}