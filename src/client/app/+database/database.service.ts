import { Injectable } from '@angular/core';
import { ProductRelease, RegressionTest, Browser, UserType, FinalTest } from '../shared/index';

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

  getRegressionMatrix(matrixId: number, callback: Function) {
    this.db.getRegressionMatrix(matrixId, callback);
  }

  getRegressionMatrixList(callback: Function) {
    this.db.getRegressionMatrixList(callback);
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

  updateRegressionMatrix(matrix: FinalTest[], date: any, version: any) {
    this.db.updateRegressionMatrix(JSON.stringify(matrix), date, version);
  }
}
