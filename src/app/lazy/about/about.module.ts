import {NgModule} from '@angular/core';
import {AboutRoutingModule} from './about-routing.module';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about.component';
import {AboutPageResolver} from './about.resolver';

@NgModule({
  imports: [
    AboutRoutingModule,
    CommonModule,
  ],
  providers: [
    AboutPageResolver
  ],
  declarations: [
    AboutComponent
  ],
  exports: [
    AboutComponent
  ]
})
export class AboutModule {}
