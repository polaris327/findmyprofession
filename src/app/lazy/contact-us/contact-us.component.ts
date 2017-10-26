import {
  AfterViewInit, Component, OnDestroy, Renderer2, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactUsService} from './contact-us.service';
import {IErrorResponse} from '../../core/models/core.model';
import {REGEX_EMAIL_PATTERN} from '../../core/validators/validation-patterns.model';
import {ShowValidationErrors} from '../../core/validators/show-validation-errors.model';
import {ContactUs, ContactUsErrors, IContactUsRequest} from './contact-us.model';
import {MetaTags} from '../../core/services/meta-tags.service';
import {APP_CONFIG} from '../../core/models/app.config';
import {PlatformCheckService} from '../../core/services/platform-check.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {SuccessModalComponent} from '../../modules/success-modal/success-modal.component';

require('../../../assets/images/blue-bg/contact-us.jpg');

@Component({
  selector: 'contact-us-component',
  templateUrl: 'contact-us.component.html',
  styles: [require('./contact-us.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class ContactUsComponent extends ShowValidationErrors implements AfterViewInit, OnDestroy {

  @ViewChild('recaptcha')
  recaptcha: any;

  public widgetId: number;
  public lang: string = 'en';

  public modelForm: FormGroup;

  public content: ContactUs.IContactusPage;

  public errorMessage: string;

  public isRequestSending: boolean = false;

  public key: string;
  public fm: any;
  
  public facebook: string;
  public likedIn: string;
  public twitter: string;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private contactUsService: ContactUsService,
              public errorFormModel: ContactUsErrors,
              private metaService: MetaTags,
              private domRenderer: Renderer2,
              private platformService: PlatformCheckService,
              private modalService: NgbModal) {
    super();
  
    this.facebook = APP_CONFIG.facebookLink;
    this.likedIn = APP_CONFIG.linkedInkLink;
    this.twitter = APP_CONFIG.twitterLink;
    
    this.key = APP_CONFIG.recaptcha_key;

    const pageData: ContactUs.IContactusPage = route.snapshot.data['pageData'];
    if (pageData) {
      this.metaService.setMetaTags(pageData);
      this.content = pageData;
    }

    this.modelForm = this.fb.group({
      name: ['' , [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(REGEX_EMAIL_PATTERN)
      ]],
      message: ['' , [
        Validators.required
      ]],
      captcha: [false,[
        Validators.requiredTrue
      ]],
      isGlobalValidate: [false]
    });

    super.setData(this.modelForm , this.errorFormModel);

    this.modelForm.valueChanges
      .subscribe(() => super.onValueChanged());

    this.fm = this.errorFormModel.formErrors;
  }

  public ngAfterViewInit() {
    if (this.platformService.isBrowser) {
      this.registerReCaptchaCallback();
      this.addScript();
    }
  }

  public ngOnDestroy() {
    super.clearErrors();
  }

  public closeError(field: string): void {
    this.fm[field] = '';
  }

  public handleCorrectCaptcha(): void {
    this.modelForm.controls['captcha'].setValue(true);
  }

  /**
   * Send form to backend
   */
  public sendForm(): void {
    if (!this.modelForm) {
      return;
    }

    this.errorMessage = '';
    this.modelForm.controls['isGlobalValidate'].setValue(true);
    super.onValueChanged();

    if (this.modelForm.invalid) {
      this.errorMessage = 'Form not valid.';
      return;
    }

    this.isRequestSending = true;

    this.contactUsService.sendForm(ContactUsComponent.parseObject(this.modelForm.value))
      .finally(() => this.isRequestSending = false)
      .subscribe(
        () => {
          this.modelForm.reset();
          this.refreshReCaptch();
          this.openModal();
        },
        (error: IErrorResponse) => this.errorMessage = error.message
      );
  }

  private openModal(): void {
    const modal: NgbModalRef = this.modalService.open(SuccessModalComponent);
    modal.componentInstance.message = 'Your message was successfully sent.';
    modal.componentInstance.icon = 'subscribe';
  }

  /**
   * Parse model to request
   * @param model
   * @returns {{name, email, message}}
   */
  public static parseObject(model: any): IContactUsRequest {
    return {
      name: model.name,
      email: model.email,
      message: model.message
    };
  }

  registerReCaptchaCallback() {
    window['reCaptchaLoad'] = () => {
      const config = {
        'sitekey': this.key,
        'callback': this.handleCorrectCaptcha.bind(this),
        'expired-callback': this.onExpired.bind(this)
      };
      this.widgetId = this.render(this.recaptcha.nativeElement, config);
    };
  }

  onExpired(){
    this.errorFormModel.formErrors.captcha = 'Captcha expired.'
  }

  private render( element : HTMLElement, config ) : number {
    return window['grecaptcha'].render(element, config);
  }

  addScript() {
    let script = this.domRenderer.createElement('script');
    const lang = this.lang ? '&hl=' + this.lang : '';
    script.src = `${APP_CONFIG.recaptcha_link}?onload=reCaptchaLoad&render=explicit${lang}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  private refreshReCaptch(): void {
    window['grecaptcha'].reset(this.widgetId);
  }
}