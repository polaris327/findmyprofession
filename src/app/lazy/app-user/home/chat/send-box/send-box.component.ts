import {
  Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChange, SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IChatMessage} from '../../user-home.model';
import {ResizeModeService} from '../../../../../core/services/resize-mode.service';
import {MODE_MOB} from '../../../../../core/models/core.model';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'fmp-send-box-component',
  templateUrl: 'send-box.html',
  styles: [require('./send-box.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class FmpSendBoxComponent implements OnChanges, OnDestroy {

  @ViewChild('submitButton')
  submitButton: any;

  @ViewChild('sendField')
  sendField: ElementRef;

  @Input()
  maxSymbols: number = 500;

  @Input()
  isMessageSending: boolean = false;

  @Output()
  onMessageSend: EventEmitter<IChatMessage> = new EventEmitter<IChatMessage>();

  public modelForm: FormGroup;
  public formError: string | null;

  public fileName: string | null;
  public isFileSelected: boolean = false;
  public isMobileMode: boolean = false;
  private destroyed$: Subject<undefined> = new Subject<undefined>();

  /**
   * Form errors messages
   * @type {{required: string; minlength: string; maxlength: string}}
   */
  private errorMessages: Object = {
    required: `You must write something first`,
    maxlength: `Message max length is ${this.maxSymbols}`
  };

  constructor(private fb: FormBuilder,
              private resizeModeService: ResizeModeService) {

    this.subscribeToResize();
    this.createForm();
  }

  public ngOnChanges(changes: SimpleChanges) {
    const sending: SimpleChange = changes['isMessageSending'];
    if (sending && this.modelForm) {
      if (sending.currentValue) {
        this.getModel().disable()
      } else {
        this.getModel().enable();
        if (this.sendField) {
          this.sendField.nativeElement.focus();
        }
      }
    }
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public keyPressed(keyEvent: KeyboardEvent): void {
    if (keyEvent.keyCode === 13 && !keyEvent.shiftKey) {
      if (!this.isMobileMode) {
        keyEvent.preventDefault();
        keyEvent.stopPropagation();
        this.sendMessage();
      }
    }
  }

  public sendMessage(): void {
    const model: any = Object.assign(this.modelForm.value);
    const messageBody: string = model.message ? model.message.toString() : '';
    this.getModel().setValue(messageBody.trim());
    if (this.modelForm.valid) {
      this.onMessageSend.emit(Object.assign(this.modelForm.value));
      this.resetForm();
      this.sendField.nativeElement.focus();
    } else {
      this.showErrors();
    }
  }

  public fileSelected(file: File): void {
    if (file) {
      this.getModel('attachment_name').setValue(file.name);
      this.getModel('attachment').setValue(file);
      this.getModel('attachment_name').disable();
      this.isFileSelected = true;
      this.focusSubmitButton();
    }
  }

  public fileRemoved(): void {
    this.resetForm();
  }

  private showErrors(): void {
    Object.keys(this.getModel().errors)
      .forEach((key: string) => this.formError = this.errorMessages[key]);
  }

  private resetForm(): void {
    this.fileName = null;
    this.isFileSelected = false;
    if (this.getModel('attachment_name').disabled) {
      this.getModel('attachment_name').enable();
    }
    this.modelForm.reset();
  }

  private focusSubmitButton(): void {
    if (this.submitButton && this.submitButton.nativeElement) {
      (<HTMLButtonElement>this.submitButton.nativeElement).focus();
    }
  }

  private subscribeToResize(): void {
    this.resizeModeService.mode$
      .takeUntil(this.destroyed$)
      .subscribe(
        (mode: string) => this.isMobileMode = mode === MODE_MOB
      );
  }

  private createForm(): void {
    this.modelForm = this.buildModelForm();
    this.modelForm.valueChanges
      .subscribe(() => this.formError = null);
  }

  private buildModelForm(): FormGroup {
    return this.fb.group({
      message: ['', [
        //Validators.required,
        Validators.maxLength(this.maxSymbols)
      ]],
      attachment: [],
      attachment_name:[]
    });
  }

  private getModel(name: string = 'message'): AbstractControl {
    return this.modelForm.get(name);
  }
}