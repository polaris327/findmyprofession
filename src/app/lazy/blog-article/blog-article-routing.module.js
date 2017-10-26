import { RouterModule } from '@angular/router';
import { BlogArticleComponent } from './blog-article.component';
import { BlogArticleDataResolver } from './blog-article.resolver';
var routes = [
    {
        path: '',
        component: BlogArticleComponent,
        resolve: {
            article: BlogArticleDataResolver
        }
    }
];
export var BlogArticleRoutingModule = RouterModule.forChild(routes);
