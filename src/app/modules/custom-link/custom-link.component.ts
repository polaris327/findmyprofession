import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'fmp-custom-link',
  templateUrl: 'custom-link.html'
})
export class CustomLinkComponent {

  @Input()
  title: string;

  @Input()
  linkArray: Array<string>;

  @Input()
  linkClass: Array<string>;

  constructor(private router: Router) {}

  public linkTaped(tapEvent: TouchEvent): void {
    tapEvent.preventDefault();
    this.openLink();
  }

  public linkMove(moveEvent: TouchEvent): void {
    moveEvent.preventDefault();
  }

  public linkClicked(clickEvent: MouseEvent): void {
    clickEvent.preventDefault();
    this.openLink();
  }

  private openLink(): void {
    this.router.navigate(this.linkArray);
  }
}