import {Component, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CalendlyComponent} from '../calendly/calendly.component';
import {Router} from '@angular/router';

@Component({
  selector: 'fmp-career-finder-steps-modal',
  templateUrl: 'career-finder-steps-modal.html',
  styles: [require('./career-finder-steps-modal.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class CareerFinderStepsModalComponent {

  public step: number = 0;
  public price: number;

  constructor(private modalService: NgbModal,
              private activeModal: NgbActiveModal,
              private router: Router) {}

  public goToStep(step: number): void {
    this.step = step;
  }

  public cancel(): void {
    this.activeModal.close();
  }

  public openCalendly(): void {
    this.activeModal.close();
    const modal: NgbModalRef = this.modalService.open(CalendlyComponent, {
      size: 'lg'
    });

    if (modal) {
      modal.componentInstance.type = 'career-finder-intro';
    }
  }

  public openCareerFinderDetails($event: any): void {
    (<MouseEvent>$event.event).preventDefault();
    this.activeModal.close();
    this.router.navigate([$event.url]);
  }

}