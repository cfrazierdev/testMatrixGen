import { RouterModule, Routes } from '@angular/router';

import { ProductReleaseComponent } from './+product-release/index';
import { RegressionTestComponent } from './+regression-test/index';
import { BrowserComponent } from './+browser/index';
import { UserTypeComponent } from './+user-type/index';
import { LeftMenuComponent } from './shared/index';

var baseString = location.pathname.split('/');
export const base: string = baseString.slice(1, baseString.length - 1).join('/');

export const routes: Routes = [
  {
    path: '',
    component: ProductReleaseComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: base,
    component: LeftMenuComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'tests',
    component: RegressionTestComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'browsers',
    component: BrowserComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'userTypes',
    component: UserTypeComponent,
    canActivate: ['CanAlwaysActivateGuard']
  }
];

export const routing = RouterModule.forRoot(routes);
