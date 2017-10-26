import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FMPAppComponent } from './app.component';
import { AppModule } from './app.module';
import { BrowserTransferStateModule } from '../modules/transfer-state/browser-transfer-state.module';

@NgModule({
	bootstrap: [ FMPAppComponent ],
	imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    BrowserTransferStateModule,
    AppModule
	]
})
export class BrowserAppModule {}
