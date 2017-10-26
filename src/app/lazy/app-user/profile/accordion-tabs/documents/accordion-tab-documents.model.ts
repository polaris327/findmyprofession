export interface IDocumentModel {
  readonly id?: number;
  name: string;
  type: string;
  added_by: string;
  date_added: string;
  document: string;
}