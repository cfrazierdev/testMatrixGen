import { ProductRelease, RegressionTest, Browser, UserType } from '../index';

export class Session {
  productRelease: ProductRelease;
  regressionTests: RegressionTest[];
  browsers: Browser[];
  userTypes: UserType[];
}
