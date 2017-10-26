import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {CoachingPackagesHolderRoutingModule} from './coaching-packages-routing-holder.module';
import {CoachingPackagesHolderComponent} from './coaching-packages-holder.component';
import {CoachingPackagesHolderResolver} from './coaching-packages-holder.resolver';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoachingPackagesHolderRoutingModule
  ],
  declarations: [
    CoachingPackagesHolderComponent
  ],
  providers: [
    CoachingPackagesHolderResolver
  ],
  exports: [
    CoachingPackagesHolderComponent
  ]
})

export class CoachingPackagesHolderModule {}
