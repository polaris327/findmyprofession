import {Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation} from '@angular/core';

import {IProfileProgress, IProgressTask} from './profile-progress.model';

@Component({
  selector: 'fmp-profile-progress-component',
  templateUrl: 'profile-progress.html',
  styles: [require('./profile-progress.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class ProfileProgressComponent implements OnChanges {

  @Input()
  progress: IProfileProgress;

  @Output()
  onProgressTaskOpen: EventEmitter<string> = new EventEmitter<string>();

  public tasks: Array<IProgressTask> = [];

  public ngOnChanges() {
    if (this.progress && this.progress.values) {
      const _tasks: Array<IProgressTask> = [];

      Object.keys(this.progress.values).forEach((item: string) => {
        if (this.progress.values[item]) {
          _tasks.push({
            title: this.progress.values[item],
            field: item
          });
        }
      });

      this.tasks = _tasks;
    }
  }

  public openTask(key: string): void {
    this.onProgressTaskOpen.emit(key);
  }
}