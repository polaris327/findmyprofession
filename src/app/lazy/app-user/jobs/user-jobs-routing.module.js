import { RouterModule } from '@angular/router';
import { UserJobsComponent } from './user-jobs.component';
import { UserJobsResolver } from './user-jobs.resolver';
var routes = [
    {
        path: '',
        component: UserJobsComponent,
        resolve: {
            price: UserJobsResolver
        }
    }
];
export var UserJobsRoutingModule = RouterModule.forChild(routes);
