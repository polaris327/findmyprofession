import { RouterModule } from '@angular/router';
import { TestimonialsComponent } from './testimonials.component';
import { TestimonialsPageDataResolver } from './testimonials.resolver';
var routes = [
    {
        path: '',
        component: TestimonialsComponent,
        resolve: {
            pageData: TestimonialsPageDataResolver
        }
    }
];
export var TestimonialsRoutingModule = RouterModule.forChild(routes);
