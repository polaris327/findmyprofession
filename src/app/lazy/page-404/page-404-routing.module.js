import { RouterModule } from '@angular/router';
import { Page404Component } from './page-404.component';
var routes = [
    {
        path: '',
        component: Page404Component
    }
];
export var Page404RoutingModule = RouterModule.forChild(routes);
