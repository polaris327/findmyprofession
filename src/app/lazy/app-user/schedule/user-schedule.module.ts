import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserScheduleRoutingModule} from './user-schedule-routing.module';
import {UserScheduleComponent} from './user-schedule.component';
import {UserScheduleResolver} from './user-schedule.resolver';
import {UserScheduleService} from './user-schedule.service';
import {ScheduleEventItemComponent} from './event-item/event-item.component';

@NgModule({
  imports: [
    CommonModule,
    UserScheduleRoutingModule
  ],
  providers: [
    UserScheduleResolver,
    UserScheduleService
  ],
  declarations: [
    UserScheduleComponent,
    ScheduleEventItemComponent
  ],
  exports: [
    UserScheduleComponent
  ]
})
export class UserScheduleModule {}