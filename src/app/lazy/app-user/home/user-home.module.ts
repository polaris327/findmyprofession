import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserHomeComponent} from './user-home.component';
import {UserHomeDataResolver} from './user-home.resolver';
import {UserHomeRoutingModule} from './user-home-routing.module';
import {FmpChatModule} from './chat/chat.module';
import {HomeCareerAdviceModule} from './home-career-advice/home-career-advice.module';
import {UserHomeService} from './user-home.service';
import {HomeUpdatesModule} from './updates/updates.module';

@NgModule({
  imports: [
    UserHomeRoutingModule,
    CommonModule,
    FmpChatModule,
    HomeCareerAdviceModule,
    HomeUpdatesModule
  ],
  providers: [
    UserHomeDataResolver,
    UserHomeService
  ],
  declarations: [
    UserHomeComponent
  ],
  exports: [
    UserHomeComponent
  ]
})
export class UserHomeModule {}
