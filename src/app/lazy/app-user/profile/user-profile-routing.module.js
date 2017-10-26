import { RouterModule } from '@angular/router';
import { UserProfileHolderComponent } from './user-profile.component';
import { ProfileContentResolver } from './user-profile.resolver';
var routes = [
    {
        path: '',
        component: UserProfileHolderComponent,
        resolve: {
            content: ProfileContentResolver
        }
    }
];
export var UserProfileRoutingModule = RouterModule.forChild(routes);
