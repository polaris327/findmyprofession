import { RouterModule } from '@angular/router';
import { UserHomeComponent } from './user-home.component';
import { UserHomeDataResolver } from './user-home.resolver';
var routes = [
    {
        path: '',
        component: UserHomeComponent,
        resolve: {
            data: UserHomeDataResolver
        }
    }
];
export var UserHomeRoutingModule = RouterModule.forChild(routes);
