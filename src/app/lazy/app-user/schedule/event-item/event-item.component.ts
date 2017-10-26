import {Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {IScheduleEvent} from '../user-schedule.model';

@Component({
  selector: 'fmp-schedule-event-item',
  templateUrl: 'event-item.html'
})

export class ScheduleEventItemComponent implements OnChanges {

  @Input()
  type: string = 'pending';

  @Input()
  event: IScheduleEvent;

  @Output()
  onEventSchedule: EventEmitter<IScheduleEvent> = new EventEmitter<IScheduleEvent>();

  @Output()
  onEventCancel: EventEmitter<IScheduleEvent> = new EventEmitter<IScheduleEvent>();

  @Output()
  onEventComplete: EventEmitter<IScheduleEvent> = new EventEmitter<IScheduleEvent>();

  constructor() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const event: SimpleChange = changes['event'];
    if (event && event.currentValue) {
      this.event.start_time = ScheduleEventItemComponent.parseTime(new Date(this.event.start_time));
      this.event.end_time = ScheduleEventItemComponent.parseTime(new Date(this.event.end_time))
    }
  }

  public cancelEvent(): void {
    this.onEventCancel.emit(this.event);
  }

  public completeEvent(): void {
    this.onEventComplete.emit(this.event);
  }

  public scheduleCall(): void {
    this.onEventSchedule.emit(this.event);
  }

  private static parseTime(date: Date): string {
    const localDate: Date = new Date(date);
    const endHours: number = localDate.getUTCHours();
    localDate.setHours(endHours);
    return localDate.toString();
  }
}