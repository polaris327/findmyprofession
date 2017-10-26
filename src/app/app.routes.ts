import {Routes} from '@angular/router';
import {CheckoutGuard} from './core/guards/checkout.guard';
import {HomeComponent} from './lazy/home/home.component';
import {AuthenticationGuard} from './core/guards/authentication.guard';
import {UserAuthGuard} from './core/guards/user-auth.guard';
import {BlogArticleComponent} from './lazy/blog-article/blog-article.component';
import {BlogArticleDataResolver} from './lazy/blog-article/blog-article.resolver';

/**
 * FMP application routes
 */

export const AppRoutes: Routes = [
  {
    canActivate: [UserAuthGuard],
    canLoad: [UserAuthGuard],
    path: '',
    component: HomeComponent
  },
  {
    path: 'career-advice/:title',
    component: BlogArticleComponent,
    resolve: {
      article: BlogArticleDataResolver
    }
  },
  {
    path: 'resume-makeover',
    loadChildren: './lazy/coaching-packages-holder/coaching-packages-holder.module#CoachingPackagesHolderModule'
  },
  {
    path: 'job-interview-prep',
    loadChildren: './lazy/coaching-packages-holder/coaching-packages-holder.module#CoachingPackagesHolderModule'
  },
  {
    path: 'career-finder',
    loadChildren: './lazy/coaching-packages-holder/coaching-packages-holder.module#CoachingPackagesHolderModule'
  },
  {
    path: 'linkedin-profile-makeover',
    loadChildren: './lazy/coaching-packages-holder/coaching-packages-holder.module#CoachingPackagesHolderModule'
  },
  {
    path: 'cover-letter-service',
    loadChildren: './lazy/coaching-packages-holder/coaching-packages-holder.module#CoachingPackagesHolderModule'
  },
  {
    path: 'testimonials',
    loadChildren: './lazy/testimonials/testimonials.module#TestimonialsModule'
  },
  {
    path: 'contact-us',
    loadChildren: './lazy/contact-us/contact-us.module#ContactUsModule'
  },
  {
    canLoad: [UserAuthGuard],
    canActivate: [UserAuthGuard],
    path: 'login',
    loadChildren: './lazy/signin/signin.module#SignInModule'
  },
  {
    path: 'password-reset',
    loadChildren: './lazy/password-reset/password-reset.module#PasswordResetModule'
  },
  {
    path: 'faq',
    loadChildren: './lazy/faq/faq.module#FaqModule'
  },
  {
    path: 'about-us',
    loadChildren: './lazy/about/about.module#AboutModule'
  },
  {
    path: 'terms-of-use',
    loadChildren: './lazy/privacy-policy-terms/privacy-policy-terms.module#PrivacyPolicyTermsModule'
  },
  {
    path: 'career-advice',
    loadChildren: './lazy/career-advice/career-advice.module#CareerAdviceModule'
  },  
  {
    path: 'linkedin',
    loadChildren: './lazy/career-advice/career-advice.module#CareerAdviceModule'
  },
  {
    path: 'resume-cover-letter',
    loadChildren: './lazy/career-advice/career-advice.module#CareerAdviceModule'
  },
  {
    path: 'interviewing',
    loadChildren: './lazy/career-advice/career-advice.module#CareerAdviceModule'
  },
  {
    path: 'job-search',
    loadChildren: './lazy/career-advice/career-advice.module#CareerAdviceModule'
  },
  {
    canLoad: [CheckoutGuard],
    canActivate: [CheckoutGuard],
    path: 'checkout',
    loadChildren: './lazy/checkout/checkout.module#CheckoutModule'
  },
  {
    canLoad: [AuthenticationGuard],
    canActivate: [AuthenticationGuard],
    path: 'my-jobs',
    loadChildren: './lazy/app-user/jobs/user-jobs.module#UserJobsModule'
  },
  {
    canLoad: [AuthenticationGuard],
    canActivate: [AuthenticationGuard],
    path: 'home',
    loadChildren: './lazy/app-user/home/user-home.module#UserHomeModule'
  },
  {
    canLoad: [AuthenticationGuard],
    canActivate: [AuthenticationGuard],
    path: 'my-schedule',
    loadChildren: './lazy/app-user/schedule/user-schedule.module#UserScheduleModule'
  },
  {
    canLoad: [AuthenticationGuard],
    canActivate: [AuthenticationGuard],
    path: 'my-favorite-articles',
    loadChildren: './lazy/app-user/favorite-articles/user-favorite-articles.module#UserFavoriteArticlesModule'
  },
  {
    canLoad: [AuthenticationGuard],
    canActivate: [AuthenticationGuard],
    path: 'my-profile',
    loadChildren: './lazy/app-user/profile/user-profile.module#UserProfileModule'
  },
  {
    path: '404',
    loadChildren: './lazy/page-404/page-404.module#Page404Module'
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];