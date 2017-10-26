import { RouterModule } from '@angular/router';
import { AboutPageResolver } from './about.resolver';
import { AboutComponent } from './about.component';
var routes = [
    {
        path: '',
        component: AboutComponent,
        resolve: {
            page: AboutPageResolver
        }
    }
];
export var AboutRoutingModule = RouterModule.forChild(routes);
