import { Injectable } from '@angular/core';
import '../utilities/rxjs-operators';

import { SessionService, RegressionTest, Browser, UserType } from '../index';
import { BrowserTests } from './browser-tests';
import { FinalTest } from './final-test';

@Injectable()
export class MatrixGeneratorService {
  constructor(private sessionService: SessionService) {}

  generateMatrix() {
    let browserTests: BrowserTests[] = this.assignBrowsersToTests();
    console.log(browserTests);
    this.assignUserTypesToTests(browserTests);
  }

  private assignBrowsersToTests() {
    let browsers = this.sessionService.session.browsers;
    let browserTests: BrowserTests[] = [];
    let tests: RegressionTest[] = JSON.parse(JSON.stringify(this.sessionService.session.regressionTests));
    let mobileNotOmittedTests: RegressionTest[] = [];

    tests.forEach((test:RegressionTest) => {
      if(!test.IsDeviceBlind && !test.OmitFromMobile) {
        mobileNotOmittedTests.push(test);
      }
    });

    browsers.sort((a: Browser, b: Browser) => b.BrowserPercentageWeight - a.BrowserPercentageWeight);

    for(let i = 0; i < browsers.length; i++) {
      browserTests.push({ browserName: browsers[i].BrowserName,
                          testCount: Math.round(browsers[i].BrowserPercentageWeight / 100 * mobileNotOmittedTests.length),
                          tests: [] });
    }

    for(let i = 0; i < browserTests.length; i++) {
      for(let j = 0; j < browserTests[i].testCount; j++) {
        if(i === browserTests.length - 1) {
          while(mobileNotOmittedTests.length !== 0) {
            browserTests[i].tests.push(mobileNotOmittedTests.splice(0, 1)[0]);
          }
        } else {
          let testIndex = Math.floor(Math.random() * mobileNotOmittedTests.length);
          browserTests[i].tests.push(mobileNotOmittedTests.splice(testIndex, 1)[0]);
        }
      }
    }

    return browserTests;
  }

  private assignUserTypesToTests(tests: BrowserTests[]) {
    let multiplierValueSum: number = 0;
    let numBlind: number = 0;
    let numOmittedFromMobile: number = 0;
    let totalTests: number;
    let b: number;
    let userTypes = this.sessionService.session.userTypes;
    let finalTests: FinalTest[] = [];

    this.sessionService.session.regressionTests.forEach((test: RegressionTest) => {
      test.IsDeviceBlind ? numBlind++ : numBlind;
      test.OmitFromMobile ? numOmittedFromMobile++ : numOmittedFromMobile;
    });

    totalTests = this.sessionService.session.regressionTests.length - numBlind - numOmittedFromMobile;

    userTypes.forEach((userType: UserType) => multiplierValueSum += userType.UserTypeMultiplier);

    b = totalTests / multiplierValueSum;

    userTypes.sort((a: UserType, b: UserType) => b.UserTypeMultiplier - a.UserTypeMultiplier);

    for(let i = 0; i < userTypes.length; i++) {
      if(userTypes[i].UserTypeMultiplier !== userTypes[userTypes.length - 1].UserTypeMultiplier) {
        let numTests = Math.round(userTypes[i].UserTypeMultiplier * b);
        console.log(numTests);
        for(let j = 0; j < numTests; j++) {
          let browserIndex = Math.floor(Math.random() * tests.length);

          while(tests[browserIndex].testCount === 0) {
            browserIndex = Math.floor(Math.random() * tests.length);
          }

          let testIndex = Math.floor(Math.random() * tests[browserIndex].tests.length);

          finalTests.push({ test: tests[browserIndex].tests.splice(testIndex, 1)[0],
                            browser: tests[browserIndex].browserName,
                            userType: userTypes[i] });

          tests[browserIndex].testCount--;
          totalTests--;
        }
      } else {
        while(totalTests > 0) {
          let userTypeIndex = Math.floor(Math.random() * (userTypes.length - i) + i);
          let browserIndex = Math.floor(Math.random() * tests.length);

          while(tests[browserIndex].testCount === 0) {
            browserIndex = Math.floor(Math.random() * tests.length);
          }

          let testIndex = Math.floor(Math.random() * tests[browserIndex].tests.length);

          finalTests.push({ test: tests[browserIndex].tests.splice(testIndex, 1)[0],
                            browser: tests[browserIndex].browserName,
                            userType: userTypes[userTypeIndex] });

          tests[browserIndex].testCount--;
          totalTests--;
        }
      }
    }

    console.log('finalTests.length', finalTests.length);
    console.log('finalTests', finalTests);
  }
}
