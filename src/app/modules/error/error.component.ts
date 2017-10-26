import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'fmp-error',
  templateUrl: 'error.html',
  styles: [require('./error.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class ErrorComponent {

  @Input()
  text: string | null;

  @Output()
  onErrorClick: EventEmitter<any> = new EventEmitter<any>();

  public closeErrorBlock(): void {
    this.onErrorClick.emit();
  }
}