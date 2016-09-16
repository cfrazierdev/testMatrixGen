import { ProductRelease, RegressionTest, Browser, UserType } from '../index';

export class Session {
  selectedProductRelease: ProductRelease;
  productReleases: ProductRelease[];
  regressionTests: RegressionTest[];
  browsers: Browser[];
  userTypes: UserType[];
}
