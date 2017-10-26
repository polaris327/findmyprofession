import { RouterModule } from '@angular/router';
import { UserScheduleResolver } from './user-schedule.resolver';
import { UserScheduleComponent } from './user-schedule.component';
var routes = [
    {
        path: '',
        component: UserScheduleComponent,
        resolve: {
            content: UserScheduleResolver
        }
    }
];
export var UserScheduleRoutingModule = RouterModule.forChild(routes);
