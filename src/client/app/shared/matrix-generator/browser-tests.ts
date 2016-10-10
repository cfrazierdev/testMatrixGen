import { RegressionTest } from '../regression-test/index';

export class BrowserTests {
  browserName: string;
  testCount: number;
  mobileOmittedTestCount: number;
  tests: RegressionTest[];
}
