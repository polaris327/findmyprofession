import { RouterModule } from '@angular/router';
import { CoachingPackagesHolderComponent } from './coaching-packages-holder.component';
import { CoachingPackagesHolderResolver } from './coaching-packages-holder.resolver';
var routes = [
    {
        path: '',
        component: CoachingPackagesHolderComponent,
        resolve: {
            list: CoachingPackagesHolderResolver
        },
        children: [
            {
                path: '',
                loadChildren: './coaching-package/coaching-package.module#CoachingPackageModule'
            }
        ]
    }
];
export var CoachingPackagesHolderRoutingModule = RouterModule.forChild(routes);
