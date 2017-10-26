import { RouterModule } from '@angular/router';
import { PrivacyPolicyTermsComponent } from './privacy-policy-terms.component';
import { PrivacyTermsPageDataResolver } from './privacy-policy-terms.resolver';
var routes = [
    {
        path: '',
        component: PrivacyPolicyTermsComponent,
        resolve: {
            pageContent: PrivacyTermsPageDataResolver
        }
    }
];
export var PrivacyPolicyTermsRoutingModule = RouterModule.forChild(routes);
