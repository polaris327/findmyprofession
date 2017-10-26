import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({ name: 'isToday' })
export class MessageDayPipe implements PipeTransform {
  private currentDateString: string;
  private datePipe: DatePipe = new DatePipe('en-US');
  constructor() {
    this.currentDateString = new Date().toDateString();
  }
  transform(date: string): string {
    return new Date(date).toDateString() === this.currentDateString ? 'Today' : this.datePipe.transform(date, 'EEE');
  }
}