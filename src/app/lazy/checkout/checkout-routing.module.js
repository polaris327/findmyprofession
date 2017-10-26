import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CheckoutPageResolver } from './chekout.resolver';
var routes = [
    {
        path: '',
        component: CheckoutComponent,
        resolve: {
            content: CheckoutPageResolver
        }
    }
];
export var CheckoutRoutingModule = RouterModule.forChild(routes);
