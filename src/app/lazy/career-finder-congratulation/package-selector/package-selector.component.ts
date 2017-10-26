import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {IPackageSelectEvent, IPackageSelectItem} from './package-selector.model';

@Component({
  selector: 'fmp-package-selector-component',
  templateUrl: 'package-selector.component.html',
  styles: [require('./package-selector.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class PackageSelectorComponent {

  @Input()
  fmpPlan: IPackageSelectItem;

  @Input()
  isSelected: boolean = false;

  @Output()
  onPackageSelect: EventEmitter<IPackageSelectEvent> = new EventEmitter<IPackageSelectEvent>();
  
  @Output()
  onPackageTypeChanged: EventEmitter<IPackageSelectItem> = new EventEmitter<IPackageSelectItem>();


  public radioButtonChanged(): void {
    this.onPackageSelect.emit({
      isSelected: this.isSelected,
      fmpPlan: this.fmpPlan
    });
  }

  public valueSelected(type: any): void {
    this.fmpPlan.selectedType = type;
    if (this.isSelected) {
      this.onPackageTypeChanged.emit(this.fmpPlan);
    }
  }
}