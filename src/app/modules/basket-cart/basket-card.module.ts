import {NgModule} from '@angular/core';

import {BasketCartComponent} from './basket-cart.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
    BasketCartComponent
  ],
  exports: [
    BasketCartComponent
  ]
})
export class BasketCartModule {}
