import {Component, Input} from '@angular/core';

@Component({
  selector: 'fmp-symbols-counter-component',
  templateUrl: 'symbols-counter.html'
})
export class FmpSymbolsCounterComponent{

  @Input()
  maxSymbols: number = 0;

  @Input()
  value: string | null;

}