import { RouterModule } from '@angular/router';
import { CareerFinderCongratulationComponent } from './career-finder-congratulation.component';
import { CongratulationCareerFinderResolver } from './career-finder-congratulation.resolver';
var routes = [
    {
        path: '',
        component: CareerFinderCongratulationComponent,
        resolve: {
            content: CongratulationCareerFinderResolver
        }
    }
];
export var CareerFinderCongratulationRoutingModule = RouterModule.forChild(routes);
