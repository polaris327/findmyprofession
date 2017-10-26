import {Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {REGEX_EMAIL_PATTERN} from '../../../core/validators/validation-patterns.model';
import {BlogArticleService} from '../blog-article.service';
import {ShowValidationErrors} from '../../../core/validators/show-validation-errors.model';
import {SubscribeToArticleErrors} from './subscribe-to-article.model';
import {IErrorResponse} from '../../../core/models/core.model';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {SuccessModalComponent} from '../../../modules/success-modal/success-modal.component';

@Component({
  selector: 'subscribe-to-article-component',
  templateUrl: 'subscribe-to-article.html',
  styles: [require('./subscribe-to-article.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class SubscribeToArticleComponent extends ShowValidationErrors implements OnDestroy {

  @ViewChild('element')
  element: ElementRef;

  public modelForm: FormGroup;
  public isRequestSending: boolean = false;
  public fm: any;

  constructor(private fb: FormBuilder,
              private blogArticleService: BlogArticleService,
              public errorFormModel: SubscribeToArticleErrors,
              private modalService: NgbModal) {
    super();

    this.buildModelForm();
  }

  /**
   * Method to subscribe to article
   */
  public subscribeToArticle(): void {
    this.setGlobal(true);
    super.onValueChanged();

    if (this.modelForm.invalid) {
      return;
    }
    const email: string = this.modelForm.value.email;
    this.isRequestSending = true;
    this.modelForm.get('email').disable();

    this.blogArticleService.subscribeToArticle(email)
      .finally(() => this.isRequestSending = false)
      .subscribe(
        () => {
          const modal: NgbModalRef = this.modalService.open(SuccessModalComponent, {backdrop: true});
          modal.componentInstance.message = `Check your inbox for some Find My Profession greatness`;
          modal.componentInstance.icon = 'subscribe';
          this.modelForm.reset();
        },
        (error: IErrorResponse) => {
          this.modelForm.get('email').enable();
          this.fm.email = error.message;
        }
      )
  }

  public closeError(): void {
    this.fm.email = '';
  }

  public ngOnDestroy() {
    super.clearErrors();
    this.modelForm.reset();
  }

  /**
   * Method to build reactive form model
   */
  private buildModelForm(): void {
    this.modelForm = this.fb.group({
      email: ['',[
        Validators.required,
        Validators.pattern(REGEX_EMAIL_PATTERN)
      ]],
      isGlobalValidate: [false]
    });

    super.setData(this.modelForm , this.errorFormModel);

    this.fm = this.errorFormModel.formErrors;

    this.modelForm.get('email').valueChanges
      .filter(() => this.modelForm.get('isGlobalValidate').value)
      .subscribe(() => {
        this.setGlobal(false);
        super.onValueChanged();
        super.clearErrors();
      });
  }

  /**
   * Set global validate value as params value
   * @param value
   */
  private setGlobal(value: boolean): void {
    this.modelForm.controls['isGlobalValidate'].setValue(value);
  }
}