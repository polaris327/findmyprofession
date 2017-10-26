export interface IDocumentTemplate {
  readonly id: number;
  readonly name: string;
  readonly template: string;
  readonly preview?: string;
}