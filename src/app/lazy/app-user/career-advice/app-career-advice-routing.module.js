import { RouterModule } from '@angular/router';
import { CareerAdviceComponent } from './app-career-advice.component';
var routes = [
    {
        path: '',
        component: CareerAdviceComponent
    }
];
export var UserCareerAdviceRoutingModule = RouterModule.forChild(routes);
