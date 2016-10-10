'use strict';

var default_values = module.exports.DATABASE_DEFAULT_VALUES;

var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('regressiontestmatrix.db');
var dbWrapper;

dbWrapper = {
  getProductReleases: (callback) => {
    db.all('SELECT * FROM ProductRelease', (err, rows) => {
      if(err) { 
        callback(err);
        return;
      }

      callback(null, rows);
      return;
    });
  },
  getRegressionTests: (callback) => {
    db.all('SELECT * FROM Tests', (err, rows) => {
      if(err) {
        callback(err);
        return;
      }

      callback(null, rows);
      return;
    });
  },
  getBrowsers: (callback) => {
    db.all('SELECT * FROM Browsers', (err, rows) => {
      if(err) {
        callback(err);
        return;
      }

      callback(null, rows);
      return;
    });
  },
  getUserTypes: (callback) => {
    db.all('SELECT * FROM UserTypes', (err, rows) => {
      if(err) {
        callback(err);
        return;
      }

      callback(null, rows);
      return;
    })
  },
  updateProductReleases: (releases) => {
    for(let i = 0; i < releases.length; i++) {
      let stmt = db.prepare('INSERT OR REPLACE INTO ProductRelease (ProductReleaseId, ProductReleaseVersion) VALUES (?, ?)');
      stmt.run(releases[i].ProductReleaseId, releases[i].ProductReleaseVersion);
      stmt.finalize();
    }
  },
  updateRegressionTests: (tests) => {
    for(let i = 0; i < tests.length; i++) {
      let stmt = db.prepare('INSERT OR REPLACE INTO Tests (RegressionTestSuiteId, RegressionTestSuiteName, RiskLevelId, IsCore, IsDeviceBlind, IsUserTypeBlind, OmitFromMobile) VALUES (?, ?, ?, ?, ?, ?, ?)');
      stmt.run(tests[i].RegressionTestSuiteId, tests[i].RegressionTestSuiteName, tests[i].RiskLevelId, tests[i].IsCore, tests[i].IsDeviceBlind, tests[i].IsUserTypeBlind, tests[i].OmitFromMobile);
      stmt.finalize();
    }
  },
  updateBrowserPercentages: (browsers) => {
    for(let i = 0; i < browsers.length; i++) {
      let stmt = db.prepare('INSERT OR REPLACE INTO Browsers (BrowserId, BrowserName, BrowserPercentageWeight) VALUES (?, ?, ?)');
      stmt.run(browsers[i].BrowserId, browsers[i].BrowserName, browsers[i].BrowserPercentageWeight);
      stmt.finalize();
    }
  },
  updateUserTypes: (userTypes) => {
    for(let i = 0; i < userTypes.length; i++) {
      let stmt = db.prepare('INSERT OR REPLACE INTO UserTypes (UserTypeId, UserTypeDescription, UserTypeMultiplier) VALUES (?, ?, ?)');
      stmt.run(userTypes[i].UserTypeId, userTypes[i].UserTypeDescription, userTypes[i].UserTypeMultiplier);
      stmt.finalize();
    }
  },
  updateTestDeviceUserTypes: (testDeviceUserTypes) => {
    /*for(let i = 0; i < testDeviceUserTypes.length; i++) {
      let stmt = db.prepare('INSERT OR REPLACE INTO TestDeviceUserTypes (TestSuiteWithDeviceAndUserTypeId, RegressionTestSuiteId, DeviceId, UserTypeId, ProductReleaseId, DeviceCount) VALUES (?, ?, ?, ?, ?, ?)');
      stmt.run(testDeviceUserTypes[i].UserTypeId, testDeviceUserTypes[i].UserTypeDescription, testDeviceUserTypes[i].UserTypeMultiplier, testDeviceUserTypes[i]., testDeviceUserTypes[i]., testDeviceUserTypes[i].);
      stmt.finalize();
    }*/
  },
  deleteProductRelease: (release) => {
    let stmt = db.prepare('DELETE FROM ProductRelease WHERE ProductReleaseId = ' + release.ProductReleaseId);
    stmt.run();
    stmt.finalize();
  },
  deleteRegressionTest: (test) => {
    let stmt = db.prepare('DELETE FROM Tests WHERE RegressionTestSuiteId = ' + test.RegressionTestSuiteId);
    stmt.run();
    stmt.finalize();
  },
  deleteUserType: (userType) => {
    let stmt = db.prepare('DELETE FROM UserTypes WHERE UserTypeId = ' + userType.UserTypeId);
    stmt.run();
    stmt.finalize();
  }
}

module.exports.dbWrapper = dbWrapper;

db.serialize(() => {
  db.run(`CREATE TABLE if not exists ProductRelease(
    ProductReleaseId INTEGER PRIMARY KEY,
    ProductReleaseVersion NVARCHAR(255)
  )`);
  db.run(`CREATE TABLE if not exists Browsers(
    BrowserId INTEGER PRIMARY KEY,
    BrowserName NVARCHAR(255),
    BrowserPercentageWeight FLOAT
  )`);
  db.run(`CREATE TABLE if not exists UserTypes(
    UserTypeId INTEGER PRIMARY KEY,
    UserTypeDescription NVARCHAR(255),
    UserTypeMultiplier INTEGER
  )`);
  db.run(`CREATE TABLE if not exists Tests(
    RegressionTestSuiteId INTEGER PRIMARY KEY,
    RegressionTestSuiteName NVARCHAR(255),
    RiskLevelId INTEGER,
    IsCore INTEGER,
    IsDeviceBlind INTEGER,
    IsUserTypeBlind INTEGER,
    OmitFromMobile INTEGER
  )`);
  db.run(`CREATE TABLE if not exists TestDeviceUserType(
    TestSuiteWithDeviceAndUserTypeId INTEGER,
    RegressionTestSuiteId INTEGER,
    DeviceId INTEGER,
    UserTypeId INTEGER,
    ProductReleaseId INTEGER,
    DeviceCount INTEGER
  )`);

  for(let i = 0; i < default_values.PRODUCT_RELEASES_DEFAULT_VALUES.length; i++) {
    let productRelease = default_values.PRODUCT_RELEASES_DEFAULT_VALUES[i];
    let stmt = db.prepare('INSERT OR IGNORE INTO ProductRelease (ProductReleaseId, ProductReleaseVersion) VALUES (?, ?)');
    stmt.run(productRelease.ProductReleaseId, productRelease.ProductReleaseVersion);
    stmt.finalize();
  }
  for(let i = 0; i < default_values.BROWSERS_DEFAULT_VALUES.length; i++) {
    let browser = default_values.BROWSERS_DEFAULT_VALUES[i];
    let stmt = db.prepare('INSERT OR IGNORE INTO Browsers (BrowserId, BrowserName, BrowserPercentageWeight) VALUES (?, ?, ?)');
    stmt.run(browser.BrowserId, browser.BrowserName, browser.BrowserPercentageWeight);
    stmt.finalize();
  }
  for(let i = 0; i < default_values.USER_TYPES_DEFAULT_VALUES.length; i++) {
    let userType = default_values.USER_TYPES_DEFAULT_VALUES[i];
    let stmt = db.prepare('INSERT OR IGNORE INTO UserTypes (UserTypeId, UserTypeDescription, UserTypeMultiplier) VALUES (?, ?, ?)');
    stmt.run(userType.UserTypeId, userType.UserTypeDescription, userType.UserTypeMultiplier);
    stmt.finalize();
  }
  for(let i = 0; i < default_values.REGRESSION_SUITES_DEFAULT_VALUES.length; i++) {
    let test = default_values.REGRESSION_SUITES_DEFAULT_VALUES[i];
    let stmt = db.prepare('INSERT OR IGNORE INTO Tests (RegressionTestSuiteId, RegressionTestSuiteName, RiskLevelId, IsCore, IsDeviceBlind, IsUserTypeBlind, OmitFromMobile) VALUES (?, ?, ?, ?, ?, ?, ?)');
    stmt.run(test.RegressionTestSuiteId, test.RegressionTestSuiteName, test.RiskLevelId, test.IsCore, test.IsDeviceBlind, test.IsUserTypeBlind, test.OmitFromMobile);
    stmt.finalize();
  }
});
