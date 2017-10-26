import { RouterModule } from '@angular/router';
import { SignInComponent } from './signin.component';
var routes = [
    {
        path: '',
        component: SignInComponent
    }
];
export var SignInRoutingModule = RouterModule.forChild(routes);
