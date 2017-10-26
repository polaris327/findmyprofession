import { RouterModule } from '@angular/router';
import { CareerAdviceComponent } from './career-advice.component';
import { CareerAdviceDataResolver } from './career-advice.resolver';
var routes = [
    {
        path: '',
        component: CareerAdviceComponent,
        resolve: {
            pageContent: CareerAdviceDataResolver
        }
    }
];
export var CareerAdviceRoutingModule = RouterModule.forChild(routes);
