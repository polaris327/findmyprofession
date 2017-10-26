import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {UserProfileService} from '../../user-profile.service';
import {IDocumentModel} from './accordion-tab-documents.model';
import {IProfile} from '../../user-profile.model';
import {ICustomFileDropEvent} from './custom-file-drop/custom-file-drop.model';
import {IDocumentTemplate} from './document-templates/document-template.model';
import {TemplatePreviewModalComponent} from './template-preview-modal/template-preview-modal.component';
import {AlertModalComponent} from '../../../../../modules/alert-modal/alert-modal.component';
import {IErrorResponse} from '../../../../../core/models/core.model';
import {CoreUtilitiesService} from '../../../../../core/services/core-utilities.service';
import {ActivatedRoute} from '@angular/router';
import {FileUploadPipe} from '../../../../../shared/pipes/backend-file';

@Component({
  selector: 'fmp-accordion-tab-documents',
  templateUrl: 'accordion-tab-documents.html'
})
export class AccordionTabDocumentsComponent implements AfterViewInit {

  @ViewChild('point')
  point: any;

  @Input()
  documents: Array<IDocumentModel>;

  @Input()
  templates: Array<IDocumentTemplate>;

  @Output()
  onFileUploaded: EventEmitter<IProfile> = new EventEmitter<IProfile>();

  @Output()
  onTemplateSelected: EventEmitter<undefined> = new EventEmitter<undefined>();

  public errorMessage: string;
  public fileAcceptFormats: Array<string> = [];

  /**
   * Document types
   * @type {[string,string,string]}
   */
  public documentTypes: Array<string> = [
    'Resume',
    'Cover letter',
    'Other'
  ];

  constructor(private profileService: UserProfileService,
              private modalService: NgbModal,
              private route: ActivatedRoute) {
    this.fileAcceptFormats = CoreUtilitiesService.fileAcceptFormats;
  }

  public ngAfterViewInit(): void {
    const query: any = this.route.snapshot.queryParams;
    if (query && query.tab) {
      this.point.nativeElement.scrollIntoView(false);
    }
  }

  /**
   * Method to upload file to server
   * @param event
   */
  public onFileUpload(event: ICustomFileDropEvent): void {
    const isFormatValid: boolean = CoreUtilitiesService.checkFileExtension(event.file);

    if (!isFormatValid) {
      const modalRef: NgbModalRef = this.modalService.open(AlertModalComponent);

      modalRef.componentInstance.showButtons = false;
      modalRef.componentInstance.message = `File you want upload has unsupported format. Please select another. Accept formats: ${this.fileAcceptFormats.join(' ; ')}`;
    } else {
      this.profileService.uploadDocument(event.file)
        .subscribe(
          (response: IProfile) => {
            event.close.call(event.context);
            this.onFileUploaded.emit(response);
          },
          (error: IErrorResponse) => {
            event.close.call(event.context);
            this.handleError(error);
          }
        );
    }
  }

  /**
   * Method to remove document by id
   * @param doc
   */
  public removeDocument(doc: IDocumentModel): void {
    if (doc) {
      const message: string = `Are you sure you want to permanently delete (${doc.name})?`;

      this.openModal(message , this.removeDocumentCallback.bind(this, doc), 'Wait');
    }
  }

  /**
   * Callback for remove document
   * @param doc
   */
  private removeDocumentCallback(doc: IDocumentModel): void {
    this.profileService.removeDocument(doc.id)
      .subscribe(
        (profile: IProfile) => this.onFileUploaded.emit(profile),
        (error: IErrorResponse) => this.handleError(error)
      );
  }

  /**
   * Update document type
   * @param doc
   */
  public updateDocument(doc: IDocumentModel): void {
    this.profileService.updateDocument(doc)
      .subscribe(
        (profile: IProfile) => this.onFileUploaded.emit(profile),
        (error: IErrorResponse) => this.handleError(error)
      );
  }

  /**
   * Method to select existing template
   * @param template
   */
  public selectDocumentTemplate(template: IDocumentTemplate): void {
    const message: string = 'Are you sure this is the resume template you want? Once you confirm you cannot go back.';
    this.openModal(message, this.selectDocumentTemplateCallback.bind(this , template), 'Warning');
  }

  public downloadDocument(object: any): void {
    this.profileService.downloadFile(object.link)
      .subscribe(
        (data: any) => CoreUtilitiesService.saveFile(data, object.name)
      );
  }

  /**
   * Callback for select document template
   * @param template
   */
  private selectDocumentTemplateCallback(template: IDocumentTemplate): void {
    /**
     * Downloading specific document template
     */
    const pathPipe: FileUploadPipe = new FileUploadPipe();
    const path: string = pathPipe.transform(template.template);
    this.profileService.downloadFile(path)
      .subscribe(
        (data: any) =>{
          CoreUtilitiesService.saveFile(data, template.name);
          this.onTemplateSelected.emit();
        }
      );
  }

  /**
   * Method to open modal and trigger callback
   * @param message
   * @param callback
   * @param title
   */
  private openModal(message: string, callback: Function, title?: string): void {
    const modal: NgbModalRef = this.modalService.open(AlertModalComponent, {
      backdrop: false
    });

    modal.result.then(() => {
      callback();
    }, () => {});

    modal.componentInstance.title = title;
    modal.componentInstance.message = message;
  }

  public openPreview(link: string): void {
    const modal: NgbModalRef = this.modalService.open(TemplatePreviewModalComponent);

    modal.componentInstance.preview = link;
  }

  /**
   * Method to handle error
   * @param error
   */
  private handleError(error: IErrorResponse): void {
    this.errorMessage = error.message;
  }
}