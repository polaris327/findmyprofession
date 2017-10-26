import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'fmp-like-icon-component',
  templateUrl: 'like-icon.html',
  styles: [require('./like-icon.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class LikeIconComponent {

  @Input()
  isLiked: boolean;

  @Input()
  isArticle: boolean;

  @Output()
  onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  public toggleLike($event: MouseEvent): void {
    $event.stopPropagation();
    this.onToggle.emit(!this.isLiked);
  }
}