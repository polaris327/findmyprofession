import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomePageDataResolver } from './home.resolver';
var routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            pageData: HomePageDataResolver
        }
    }
];
export var HomeRoutingModule = RouterModule.forChild(routes);
