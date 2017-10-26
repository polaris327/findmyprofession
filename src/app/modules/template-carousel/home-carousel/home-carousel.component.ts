import {Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'fmp-home-carousel-component',
  templateUrl: 'home-carousel.component.html',
  styles: [require('./home-carousel.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class HomeCarouselComponent implements OnChanges {

  private defaultAvatar: string = require('../../../../assets/images/logo-icon.png');
  @Input()
  item: any;

  @Input()
  defaultImage:string = this.defaultAvatar;

  @Input()
  currentShowIndex: number;

  public isAvatarLoaded: boolean = false;

  public ngOnChanges(changes: SimpleChanges): void {
    const index: SimpleChange = changes['currentShowIndex'];
    if (index && index.currentValue) {
      const numIndex: number = Math.abs(+index.currentValue);
      if (numIndex === this.item.index) {
        this.isAvatarLoaded = true;
      }
    }
  }

  public authorAvatarNotLoaded(event: ErrorEvent): void {
    if (event.target) {
      (<HTMLSourceElement>event.target).src = this.defaultAvatar;
    }
  }
}