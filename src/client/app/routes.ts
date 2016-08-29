import { RouterModule, Routes } from '@angular/router';

import { ProductReleaseComponent } from './+product-release/index';
import { RegressionTestComponent } from './+regression-test/index';

export const routes: Routes = [
  {
    path: '',
    component: ProductReleaseComponent,
    canActivate: ['CanAlwaysActivateGuard']
  },
  {
    path: 'tests',
    component: RegressionTestComponent,
    canActivate: ['CanAlwaysActivateGuard']
  }
];

export const routing = RouterModule.forRoot(routes);
