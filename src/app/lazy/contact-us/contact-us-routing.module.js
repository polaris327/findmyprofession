import { RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsPageDataResolver } from './contact-us.resolver';
var routes = [
    {
        path: '',
        component: ContactUsComponent,
        resolve: {
            pageData: ContactUsPageDataResolver
        }
    }
];
export var ContactUsRoutingModule = RouterModule.forChild(routes);
