import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FmpChatComponent} from './chat.component';
import {ChatService} from './chat.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FmpSendBoxModule} from './send-box/send-box.module';
import {MessageDayPipe} from './day-pipe/message-day.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FmpSendBoxModule
  ],
  providers: [
    ChatService
  ],
  declarations: [
    FmpChatComponent,
    MessageDayPipe
  ],
  exports: [
    FmpChatComponent
  ]
})
export class FmpChatModule {}
