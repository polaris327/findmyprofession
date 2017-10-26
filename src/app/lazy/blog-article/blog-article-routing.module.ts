import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {BlogArticleComponent} from './blog-article.component';
import {BlogArticleDataResolver} from './blog-article.resolver';

const routes: Routes = [
  {
    path: '',
    component: BlogArticleComponent,
    resolve: {
      article: BlogArticleDataResolver
    }
  }
];
export const BlogArticleRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
