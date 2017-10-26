import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafePipe} from './pipes/safe.pipe';
import {FileUploadPipe} from './pipes/backend-file';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {AssetsPathPipe} from './pipes/assets-path.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SafePipe,
    FileUploadPipe,
    SafeHtmlPipe,
    AssetsPathPipe
  ],
  exports: [
    SafePipe,
    FileUploadPipe,
    SafeHtmlPipe,
    AssetsPathPipe
  ]
})
export class SharedModule {}
