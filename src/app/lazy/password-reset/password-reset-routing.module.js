import { RouterModule } from '@angular/router';
import { PasswordResetComponent } from './password-reset.component';
var routes = [
    {
        path: '',
        component: PasswordResetComponent
    }
];
export var PasswordResetRoutingModule = RouterModule.forChild(routes);
