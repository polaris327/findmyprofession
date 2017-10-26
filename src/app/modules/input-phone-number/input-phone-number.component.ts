import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChange, SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'fmp-input-phone-number-component',
  templateUrl: 'input-phone-number.html'
})

export class InputPhoneNumberComponent implements OnChanges, OnDestroy {

  @ViewChild('phoneNumber')
  phoneNumber: any;

  @Input()
  focusTime: string;

  @Input()
  value: string;

  @Input()
  placeholder: string;

  @Input()
  fieldClass: string;

  @Output()
  onNumberInput: EventEmitter<string> = new EventEmitter<string>();

  constructor(private changeDetector: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const focusTime: SimpleChange = changes['focusTime'];
    if (focusTime && focusTime.currentValue) {
      if (this.phoneNumber) {
        this.phoneNumber.nativeElement.focus();
        this.changeDetector.detectChanges();
      }
    }
  }

  public ngOnDestroy(): void {
    this.changeDetector.detach();
  }

  /***
   * Options for number mask
   * */
  public phoneNumberConfig: any = {
    mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    guide: false,
    keepCharPositions: true
  };

  public fieldInput(value: string): void {
    this.onNumberInput.emit(InputPhoneNumberComponent.parseValue(value));
  }

  /**
   * Method to parse value to string with numbers
   * @param value
   * @returns {string}
   */
  public static parseValue(value: string): string {
    return value ? value.toString().replace(/-/g , '').replace(/\(/g , '').replace(/\)/g , '').replace(/ /g, '') : value;
  }
}