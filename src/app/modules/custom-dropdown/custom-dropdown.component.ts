import {Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {CustomChanges} from '../../core/models/core.model';

@Component({
  selector: 'fmp-custom-dropdown-component',
  templateUrl: 'custom-dropdown.html',
  styles: [require('./custom-dropdown.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class CustomDropdownComponent implements OnChanges {

  @ViewChild('dropdown')
  dropdown: NgbDropdown;

  @Input()
  openTime: any;

  @Input()
  type: string = 'common';

  @Input()
  values: Array<string | {title: string, price: number}>;

  @Input()
  selectedValue: string | {title: string, price: number};

  @Input()
  placeholder: string;

  @Input()
  isDisabled: boolean = false;

  @Output()
  valueSelected: EventEmitter<string | CustomChanges<string>> = new EventEmitter<string | CustomChanges<string>>();

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    /**
     * Detect if need to open dropwdown
     */
    const openChanges: SimpleChange = changes['openTime'];
    if (openChanges && openChanges.currentValue) {
      /**
       * manually creating async action
       */
      setTimeout(() => {
        this.dropdown.open();
      });
    }
  }

  public selectValue(value: string): void {
    if (this.type === 'jobs') {
      const oldValue: string = this.selectedValue ? this.selectedValue.toString() : '';
      const change: CustomChanges<string> = {
        currentValue: value,
        previousValue: oldValue,
        callback: () => {
          setTimeout(() => {
            this.selectedValue = oldValue;
          });
        }
      };
      this.valueSelected.emit(change);
    } else {
      this.valueSelected.emit(value);
    }
    this.selectedValue = value;
  }
}