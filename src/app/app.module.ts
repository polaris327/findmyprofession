import { NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FMPAppComponent } from './app.component';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {BasketCartModule} from './modules/basket-cart/basket-card.module';
import {HomeModule} from './lazy/home/home.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BlogArticleModule} from './lazy/blog-article/blog-article.module';

@NgModule({
	imports: [
    CommonModule,
    HttpModule,
    TransferHttpModule,
    AppRoutingModule,
    CoreModule,
    BasketCartModule,
    HomeModule,
    NoopAnimationsModule,
    BlogArticleModule
	],
	declarations: [FMPAppComponent ],
  exports: [ FMPAppComponent ]
})
export class AppModule {}
