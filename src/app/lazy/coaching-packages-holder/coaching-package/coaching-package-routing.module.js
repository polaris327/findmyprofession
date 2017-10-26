import { RouterModule } from '@angular/router';
import { CoachingPackageComponent } from './coaching-package.component';
import { CoachingPackageResolver } from './coaching-package.resolver';
var routes = [
    {
        path: '',
        component: CoachingPackageComponent,
        resolve: {
            pageData: CoachingPackageResolver
        }
    }
];
export var CoachingPackageRoutingModule = RouterModule.forChild(routes);
