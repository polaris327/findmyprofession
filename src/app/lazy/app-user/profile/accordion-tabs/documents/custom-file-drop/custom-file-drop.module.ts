import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomFileDropComponent} from './custom-file-drop.component';
import {FileDropDirective} from 'angular2-file-drop/build/file-drop';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CustomFileDropComponent,
    FileDropDirective
  ],
  exports: [
    CustomFileDropComponent
  ]
})
export class CustomFileDropModule {}
