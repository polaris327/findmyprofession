import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild, ViewEncapsulation} from '@angular/core';

import {ICustomFileDropEvent} from './custom-file-drop.model';
import {ResizeModeService} from '../../../../../../core/services/resize-mode.service';
import {MODE_MOB} from '../../../../../../core/models/core.model';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'fmp-custom-file-drop-component',
  templateUrl: 'custom-file-drop.html',
  styles: [require('./custom-file-drop.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class CustomFileDropComponent implements OnDestroy {

  @ViewChild('fileSelector')
  fileSelector: any;

  @Input()
  acceptFormats: Array<string>;

  @Output()
  onFileUpload: EventEmitter<ICustomFileDropEvent> = new EventEmitter<ICustomFileDropEvent>();

  constructor(private resizeService: ResizeModeService) {
    this.resizeService.mode$
      .takeUntil(this.destroyed$)
      .subscribe(
        (state: string) => this.isMobileMode = state === MODE_MOB
      );
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public fileIsOver: boolean = false;
  public isMobileMode: boolean = false;

  public isFileLoading: boolean = false;

  private file: File;
  private destroyed$: Subject<any> = new Subject<any>();

  public fileOver(fileIsOver: boolean): void {
    this.fileIsOver = fileIsOver;
  }

  public onFileDrop(file: File): void {
    this.isFileLoading = true;
    this.onFileUpload.emit({
      file: file,
      close: this.fileUploaded,
      context: this
    });
  }

  public selectFile(): void {
    this.fileSelector.nativeElement.click();
  }

  public inputFileSelect($event: any): void {
    const fileList: FileList = $event.target.files;
    this.onFileDrop(fileList[0]);
  }

  private fileUploaded(): void {
    this.isFileLoading = false;
  }
}