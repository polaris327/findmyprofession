import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';

import {ICustomRange} from './custom-range.model';

@Component({
  selector: 'fmp-custom-range-component',
  templateUrl: 'custom-range.component.html',
  styles: [require('./custom-range.component.scss').toString()]
})

export class CustomRangeComponent implements OnChanges {

  @ViewChild('rootProgressBar')
  rootProgressBar: any;

  @ViewChild('input')
  input;

  @Input()
  percent: number;

  @Input()
  currentValue: number;

  @Output()
  onCostChange: EventEmitter<number> = new EventEmitter<number>();

  public customRange: ICustomRange;

  private keys: Array<string> = [
    'Backspace',
    'ArrowLeft',
    'ArrowRight',
    'Delete'
  ];

  constructor() {
    this.customRange = {
      minValue: 100000,
      maxValue: 1000000,
      step: 5000,
      startValue: 100000,
      fee: 0.01,
      minRevenue: 1000
    };
  }

  public ngOnChanges() {
    if (this.percent) {
      this.customRange.fee = this.percent / 100;
      this.customRange.minRevenue*= this.percent;
      this.setNewValue(this.customRange.startValue);
      this.customRange.startValue = this.percent * this.customRange.minRevenue * 1000;
    }

    if (this.currentValue) {
      this.customRange.startValue = (this.currentValue || 1000) * 100;
      this.setNewValue(this.customRange.startValue);
    }

  }

  public setValue(e: MouseEvent): void {
    if (this.rootProgressBar && this.rootProgressBar.nativeElement && this.rootProgressBar.nativeElement.offsetWidth) {
      const blockWidth = this.rootProgressBar.nativeElement.offsetWidth;
      const value = Math.round((e.offsetX / blockWidth) * (this.customRange.maxValue / 1000)) * 1000;
      this.setNewValue(value);
    }
  }

  private setNewValue(value: number = 0): void {
    if ((value * this.customRange.fee) > this.customRange.minRevenue ) {
      this.customRange.currentValue = value;
      this.calculateProgressBarWidth(+value, this.customRange.maxValue);
      this.calculateCost(+value);
    } else {
      this.customRange.currentValue = value;
      this.calculateProgressBarWidth(+value, this.customRange.maxValue);
      this.calculateCost(this.customRange.minRevenue / this.customRange.fee);
    }

  }

  private calculateCost(value: number): void {
    this.customRange.price = Math.round(this.getCost(value, this.customRange.fee));
    this.onCostChange.emit(this.customRange.price);
  }

  private getCost(value: number, percent: number): number {
    return value * percent;
  }

  private calculateProgressBarWidth(value: number, _maxValue: number): void {
    if (!Number.isNaN(+value)) {
      value -= this.customRange.minValue;
      let percent: number = (value  * 100) / _maxValue;
      if (percent < 10) {
        percent += 0.6;
      } else if (percent > 90) {
        percent -= 0.6;
      }
      percent += value / this.customRange.minValue;
      this.customRange.progressWidth = percent;
    }
  }

  public inputValueChanged(e: MouseEvent): any {
    const borderWidth: number = Number.parseInt(getComputedStyle(this.rootProgressBar.nativeElement).borderTopWidth) || 0;
    const padding: number = Math.floor((e.target['clientHeight'] - this.rootProgressBar.nativeElement.offsetHeight)/2) - borderWidth * 2;
    if (e.offsetY< padding || e.offsetY > padding + this.rootProgressBar.nativeElement.offsetHeight) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
  }

  public valueInput(value: string | number): void {
    /**
     * Check if current value is number
     */
    if (!Number.isNaN(+value)) {
      if (+value < this.customRange.minValue || +value > this.customRange.maxValue) {
        if (+value < this.customRange.minValue) {
          this.customRange.currentValue = this.customRange.minValue;
        } else {
          this.customRange.currentValue = this.customRange.maxValue;
        }
      } else {
        this.customRange.currentValue = Math.round(+value / this.customRange.step) * this.customRange.step;
      }
      this.setNewValue(this.customRange.currentValue);
    }
  }

  /**
   * Detect enter KeyUp event
   * @param event
   */
  public keyEntered(event: KeyboardEvent): any {
    if (event.key === 'Enter') {
      if (event.target['value'] > this.customRange.maxValue) {
        event.preventDefault();
        event.target['value'] = this.customRange.maxValue;
        this.customRange.currentValue = this.customRange.maxValue;
        this.valueInput(this.customRange.maxValue);
        return false;
      }
      this.valueInput(event.target['value']);
    } else if(Number.isNaN(+event.key) && !this.keys.some((key: string) => key === event.key)) {
      event.preventDefault();
      return false;
    }
  }
}
