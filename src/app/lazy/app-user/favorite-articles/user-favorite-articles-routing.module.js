import { RouterModule } from '@angular/router';
import { UserFavoriteArticlesComponent } from './user-favorite-articles.component';
var routes = [
    {
        path: '',
        component: UserFavoriteArticlesComponent
    }
];
export var UserFavoriteArticlesRoutingModule = RouterModule.forChild(routes);
