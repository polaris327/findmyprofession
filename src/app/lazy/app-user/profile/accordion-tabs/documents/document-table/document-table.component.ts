import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

import {IDocumentModel} from '../accordion-tab-documents.model';

@Component({
  selector: 'fmp-document-table-component',
  templateUrl: 'document-table.html',
  styles: [require('./document-table.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class DocumentTableComponent {

  @Input()
  documents: Array<IDocumentModel>;

  @Input()
  documentTypes: Array<string>;

  @Output()
  onDocumentRemove: EventEmitter<IDocumentModel> = new EventEmitter<IDocumentModel>();

  @Output()
  onDocumentUpdate: EventEmitter<IDocumentModel> = new EventEmitter<IDocumentModel>();

  @Output()
  onDocumentDownload: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Remove document
   * @param document
   */
  public removeDocument(document: IDocumentModel): void {
    this.onDocumentRemove.emit(document);
  }

  /**
   * Change document type
   * @param type
   * @param doc
   */
  public documentTypeChanged(type: string , doc: IDocumentModel): void {
    /*Action*/
    doc.type = type;
    this.onDocumentUpdate.emit(doc);
  }

  public downloadDocument($event: MouseEvent, doc: IDocumentModel): void {
    $event.preventDefault();
    this.onDocumentDownload.emit({
      link: doc.document,
      name: doc.name
    })
  }
}