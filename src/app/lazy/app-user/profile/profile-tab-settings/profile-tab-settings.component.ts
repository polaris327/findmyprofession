import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'fmp-profile-tab-settings-component',
  templateUrl: 'profile-tab-settings.html',
  styles: [require('./profile-tab-settings.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class ProfileTabSettingsComponent {

  @Input()
  isCloseShow: boolean = true;

  @Input()
  isEditShow: boolean = true;

  @Output()
  onClose: EventEmitter<null> = new EventEmitter<null>();

  @Output()
  onEdit: EventEmitter<null> = new EventEmitter<null>();

  public onCloseClick(): void {
    this.onClose.emit();
  }

  public onEditClick(): void {
    this.onEdit.emit();
  }
}