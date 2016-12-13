import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import '../utilities/rxjs-operators';

import { SessionService, RegressionTest, Browser, UserType } from '../index';
import { BrowserTests } from './browser-tests';
import { FinalTest } from './final-test';
import { CONSTANTS } from '../constants';

@Injectable()
export class MatrixGeneratorService {
  matrixTests: FinalTest[] = [];
  hideLeftMenu: string = "no";
  resetMatrix: Subject<any> = new Subject();

  constructor(private sessionService: SessionService) {}

  generateMatrix() {
    this.resetMatrix.next(null);
    this.hideLeftMenu = "yes";
    setTimeout(() => {
      this.hideLeftMenu = "no";
    }, 10);
    let browserTests: BrowserTests[] = this.assignBrowsersToTests();
    this.matrixTests = this.assignUserTypesToTests(browserTests);
  }

  private assignBrowsersToTests() {
    let browsers = JSON.parse(JSON.stringify(this.sessionService.session.browsers));
    let browserTests: BrowserTests[] = [];
    let tests: RegressionTest[] = JSON.parse(JSON.stringify(this.sessionService.session.regressionTests));
    let mobileNotOmittedTests: RegressionTest[] = [];
    let mobileOmittedTests: RegressionTest[] = [];
    let deviceBlindTests: RegressionTest[] = [];

    tests.forEach((test:RegressionTest) => {
      if(!test.IsDeviceBlind && !test.OmitFromMobile) {
        mobileNotOmittedTests.push(test);
      } else if(!test.IsDeviceBlind && test.OmitFromMobile) {
        mobileOmittedTests.push(test);
      }
    });

    browsers.sort((a: Browser, b: Browser) => b.BrowserPercentageWeight - a.BrowserPercentageWeight);

    for(let i = 0; i < browsers.length; i++) {
      browserTests.push({ browserName: browsers[i].BrowserName,
                          testCount: Math.round(browsers[i].BrowserPercentageWeight / 100 * mobileNotOmittedTests.length),
                          mobileOmittedTestCount: Math.round(browsers[i].BrowserPercentageWeight / 100 * mobileOmittedTests.length),
                          tests: [] });

      let testCount = 0;
      let mobileOmittedTestCount = 0;
      browserTests.forEach((testGroup) => {
        testCount += testGroup.testCount;
        mobileOmittedTestCount += testGroup.mobileOmittedTestCount;
      });

      if(testCount > mobileNotOmittedTests.length) {
        browserTests[browserTests.length - 1].testCount = mobileNotOmittedTests.length - browserTests[browserTests.length - 1].testCount;
      }

      if(mobileOmittedTestCount > mobileOmittedTests.length) {
        browserTests[browserTests.length - 1].mobileOmittedTestCount = mobileOmittedTests.length - browserTests[browserTests.length - 1].mobileOmittedTestCount;
      }
    }

    for(let i = 0; i < browserTests.length; i++) {
      for(let j = 0; j < browserTests[i].testCount; j++) {
        let testIndex = Math.floor(Math.random() * mobileNotOmittedTests.length);
        if(mobileNotOmittedTests[testIndex]) {
          browserTests[i].tests.push(mobileNotOmittedTests.splice(testIndex, 1)[0]);
          let index = browserTests[i].tests.length - 1;
          browserTests[i].tests[index].Platform = this.setPlatform(browserTests[i], index);
        }
      }

      for(let j = 0; j < browserTests[i].mobileOmittedTestCount; j++) {
        let testIndex = Math.floor(Math.random() * mobileOmittedTests.length);
        if(mobileOmittedTests[testIndex]) {
          browserTests[i].tests.push(mobileOmittedTests.splice(testIndex, 1)[0]);
          let index = browserTests[i].tests.length - 1;
          browserTests[i].tests[index].Platform = this.setPlatform(browserTests[i], index);
        }
      }
    }

    if(mobileNotOmittedTests.length > 0 || mobileOmittedTests.length > 0) {
      let browserIndex = 0;

      for(let i = 0; i < browsers.length; i++) {
        if(browsers[i].BrowserPercentageWeight < browsers[browserIndex].BrowserPercentageWeight
          && browsers[i].BrowserPercentageWeight > 0) {
          browserIndex = i;
        }
      }

      while(mobileNotOmittedTests.length > 0 || mobileOmittedTests.length > 0) {
        if(mobileNotOmittedTests.length > 0) {
          browserTests[browserIndex].tests.push(mobileNotOmittedTests.splice(0, 1)[0]);
          browserTests[browserIndex].tests[browserTests[browserIndex].tests.length - 1]
            .Platform = this.setPlatform(browserTests[browserIndex], browserTests[browserIndex].tests.length - 1);
        }

        if(mobileOmittedTests.length > 0) {
          browserTests[browserIndex].tests.push(mobileOmittedTests.splice(0, 1)[0]);
          browserTests[browserIndex].tests[browserTests[browserIndex].tests.length - 1]
            .Platform = this.setPlatform(browserTests[browserIndex], browserTests[browserIndex].tests.length - 1);
        }
      }
    }

    return browserTests;
  }

  private setPlatform(browserTest: BrowserTests, index: number): string {
    let random = Math.random();
    let platform = '';
    switch(browserTest.browserName) {
      case 'Chrome':
        if(index < (browserTest.testCount - browserTest.mobileOmittedTestCount) / 3 || browserTest.tests[index].OmitFromMobile) {
          if(Math.random() < 0.5) { platform = 'Dc'; }
          else { platform = 'Ta'; }
        } else if (index < 2 * (browserTest.testCount - browserTest.mobileOmittedTestCount) / 3) {
          platform = 'Ma';
        } else {
          platform = 'Ta';
        }
        break;
      case 'Safari':
        if(index < (browserTest.testCount - browserTest.mobileOmittedTestCount) / 3 || browserTest.tests[index].OmitFromMobile) {
          if(Math.random() < 0.5) { platform = 'DM'; }
          else { platform = 'Ti'; }
        } else if (index < 2 * (browserTest.testCount - browserTest.mobileOmittedTestCount) / 3) {
          platform = 'Mi';
        } else {
          platform = 'Ti';
        }
        break;
      case 'Firefox':
        platform = 'Df';
        break;
      case 'IE':
        platform = 'Di';
        break;
      case 'Edge':
        platform = 'De';
        break;
    }

    return platform;
  }

  private assignUserTypesToTests(tests: BrowserTests[]) {
    let multiplierValueSum: number = 0;
    let totalTests: number = 0;
    let b: number;
    let userTypes = JSON.parse(JSON.stringify(this.sessionService.session.userTypes));
    let finalTests: FinalTest[] = [];
    let numUserTypeBlind = 0;

    tests.forEach((test:any) => {
      test.testCount = test.tests.length;
      totalTests += test.testCount;
      test.tests.forEach((t:any) => {
        if(t.IsUserTypeBlind) {
          numUserTypeBlind++;
        }
      });
    });

    userTypes.forEach((userType: UserType) => multiplierValueSum += userType.UserTypeMultiplier);

    b = (totalTests - numUserTypeBlind) / multiplierValueSum;

    userTypes.sort((a: UserType, b: UserType) => b.UserTypeMultiplier - a.UserTypeMultiplier);

    for(let i = 0; i < userTypes.length; i++) {
      let numTests = Math.floor(userTypes[i].UserTypeMultiplier * b);

      for(let j = 0; j < numTests; j++) {
        let browserIndex = Math.floor(Math.random() * tests.length);

        while(tests[browserIndex].testCount === 0) {
          browserIndex = Math.floor(Math.random() * tests.length);
        }

        let testIndex = Math.floor(Math.random() * tests[browserIndex].tests.length);
        let added = false;

        while(!added) {
          if(tests[browserIndex].tests[testIndex]) {
            finalTests.push({ test: tests[browserIndex].tests.splice(testIndex, 1)[0],
                              browser: tests[browserIndex].browserName,
                              userType: userTypes[i] });

            if(finalTests[finalTests.length - 1].test.IsUserTypeBlind) {
              finalTests[finalTests.length - 1].userType = {
                UserTypeId: '0',
                UserTypeDescription: CONSTANTS.USER_TYPE_BLIND_HEADER,
                UserTypeMultiplier: 0
              };
              testIndex = Math.floor(Math.random() * tests[browserIndex].tests.length);
              browserIndex = Math.floor(Math.random() * tests.length);

              while(tests[browserIndex].testCount === 0) {
                browserIndex = Math.floor(Math.random() * tests.length);
              }

              totalTests--;
              continue;
            }

            tests[browserIndex].testCount--;
            totalTests--;
            added = true;
          } else if(tests[browserIndex].tests.length > 0){
            testIndex = Math.floor(Math.random() * tests[browserIndex].tests.length);
          } else {
            browserIndex = Math.floor(Math.random() * tests.length);

            while(tests[browserIndex].testCount === 0) {
              browserIndex = Math.floor(Math.random() * tests.length);
            }
          }
        }
      }
    }

    while(totalTests > 0) {
      let userTypeIndex = Math.floor(Math.random() * userTypes.length);
      let browserIndex = Math.floor(Math.random() * tests.length);

      while(tests[browserIndex].testCount === 0) {
        browserIndex = Math.floor(Math.random() * tests.length);
      }

      let testIndex = Math.floor(Math.random() * tests[browserIndex].tests.length);
      let added = false;

      while(!added) {
        if(tests[browserIndex].tests[testIndex]) {
          finalTests.push({ test: tests[browserIndex].tests.splice(testIndex, 1)[0],
                            browser: tests[browserIndex].browserName,
                            userType: userTypes[userTypeIndex] });

          if(finalTests[finalTests.length - 1].test.IsUserTypeBlind) {
            finalTests[finalTests.length - 1].userType = {
              UserTypeId: '0',
              UserTypeDescription: CONSTANTS.USER_TYPE_BLIND_HEADER,
              UserTypeMultiplier: 0
            };
            testIndex = Math.floor(Math.random() * tests[browserIndex].tests.length);

            browserIndex = Math.floor(Math.random() * tests.length);

            while(tests[browserIndex].testCount === 0) {
              browserIndex = Math.floor(Math.random() * tests.length);
            }

            totalTests--;
            continue;
          }

          tests[browserIndex].testCount--;
          totalTests--;
          added = true;
        } else if(tests[browserIndex].tests.length > 0){
          testIndex = Math.floor(Math.random() * tests[browserIndex].tests.length);
        } else if(tests.every(test => test.tests.length === 0)) {
          added = true;
          tests.forEach(test => {
            test.testCount = 0;
            test.mobileOmittedTestCount = 0;
          });
        } else {
          browserIndex = Math.floor(Math.random() * tests.length);

          while(tests[browserIndex].testCount === 0) {
            browserIndex = Math.floor(Math.random() * tests.length);
          }
        }
      }
    }

    this.sessionService.session.regressionTests.forEach((test) => {
      if(test.IsDeviceBlind) {
        test.Platform = '';
        finalTests.push({ test: test,
                          browser: '',
                          userType: null });
      }
    });

    return finalTests;
  }
}
