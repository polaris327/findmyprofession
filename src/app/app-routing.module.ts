import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {AppRoutes} from './app.routes';
/**
 * Root application routing module
 * @type {ModuleWithProviders}
 */
export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
