import { Injectable } from '@angular/core';
import { ProductRelease, RegressionTest, Browser, UserType } from '../shared/index';

@Injectable()
export class DatabaseService {
  private db: any;

  constructor() {
    this.db = (<any>window)['module'].exports.dbWrapper;
  }

  getProductReleases(callback: Function) {
    this.db.getProductReleases(callback);
  }

  getRegressionTests(callback: Function) {
    this.db.getRegressionTests(callback);
  }

  getBrowsers(callback: Function) {
    this.db.getBrowsers(callback);
  }

  getUserTypes(callback: Function) {
    this.db.getUserTypes(callback);
  }

  updateRegressionTests(tests: RegressionTest[]) {
    this.db.updateRegressionTests(tests);
  }

  updateBrowserPercentages(browsers: Browser[]) {
    this.db.updateBrowserPercentages(browsers);
  }

  updateProductReleases(release: ProductRelease[]) {
    this.db.updateProductReleases(release);
  }

   updateUserTypes(userTypes: UserType[]) {
    this.db.updateUserTypes(userTypes);
  }
}
