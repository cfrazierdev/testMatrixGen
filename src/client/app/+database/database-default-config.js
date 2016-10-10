var exports = module.exports = {};

exports.DATABASE_DEFAULT_VALUES = {
  BROWSERS_DEFAULT_VALUES: [
    {
      BrowserId: 1,
      BrowserName: 'Chrome',
      BrowserPercentageWeight: 0
    },
    {
      BrowserId: 2,
      BrowserName: 'Safari',
      BrowserPercentageWeight: 0
    },
    {
      BrowserId: 3,
      BrowserName: 'IE',
      BrowserPercentageWeight: 0
    },
    {
      BrowserId: 4,
      BrowserName: 'Firefox',
      BrowserPercentageWeight: 0
    },
    {
      BrowserId: 5,
      BrowserName: 'Edge',
      BrowserPercentageWeight: 0
    }
  ],
  PRODUCT_RELEASES_DEFAULT_VALUES: [
    {
      ProductReleaseId: 1,
      ProductReleaseVersion: '3.11'
    },
    {
      ProductReleaseId: 2,
      ProductReleaseVersion: '3.12'
    },
    {
      ProductReleaseId: 3,
      ProductReleaseVersion: '3.13'
    },
    {
      ProductReleaseId: 4,
      ProductReleaseVersion: '3.14'
    }
  ],
  USER_TYPES_DEFAULT_VALUES: [
    {
      UserTypeId: 1,
      UserTypeDescription: 'Patient with 1 own account',
      UserTypeMultiplier: 1
    },
    {
      UserTypeId: 2,
      UserTypeDescription: 'Patient with 2 own accounts (different practice)',
      UserTypeMultiplier: 1
    },
    {
      UserTypeId: 3,
      UserTypeDescription: 'Patient with 1 authorized user account (same practice)',
      UserTypeMultiplier: 1
    },
    {
      UserTypeId: 4,
      UserTypeDescription: 'Patient with 1 authorized user account (different practice)',
      UserTypeMultiplier: 1
    },
    {
      UserTypeId: 5,
      UserTypeDescription: 'User with 1 authorized user account',
      UserTypeMultiplier: 1
    },
    {
      UserTypeId: 6,
      UserTypeDescription: 'User with 2 authorized user accounts (same practice)',
      UserTypeMultiplier: 1
    },
    {
      UserTypeId: 7,
      UserTypeDescription: 'User with 2 authorized user accounts (different practice)',
      UserTypeMultiplier: 1
    }
  ],
  REGRESSION_SUITES_DEFAULT_VALUES: [
    {
      RegressionTestSuiteId: 1,
      RegressionTestSuiteName: 'My Appts: Requested',
      RiskLevelId: 5,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 2,
      RegressionTestSuiteName: 'My Appts:Requested - Intergy',
      RiskLevelId: 5,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 3,
      RegressionTestSuiteName: 'Patient Login / Switching',
      RiskLevelId: 6,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 4,
      RegressionTestSuiteName: 'Patient Login / Switching - Intergy',
      RiskLevelId: 6,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 5,
      RegressionTestSuiteName: 'My Messages',
      RiskLevelId: 6,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 6,
      RegressionTestSuiteName: 'My Messages - Intergy',
      RiskLevelId: 6,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 7,
      RegressionTestSuiteName: 'My Health: Medications',
      RiskLevelId: 5,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 8,
      RegressionTestSuiteName: 'My Health: Medications - Intergy',
      RiskLevelId: 5,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 9,
      RegressionTestSuiteName: 'My Health: Summary',
      RiskLevelId: 5,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 10,
      RegressionTestSuiteName: 'My Health: Summary - Intergy',
      RiskLevelId: 5,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 11,
      RegressionTestSuiteName: 'Pay My Bill : TransFirst Widget',
      RiskLevelId: 6,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 12,
      RegressionTestSuiteName: 'Pay my Bill : TransFirst Widget - Intergy',
      RiskLevelId: 6,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 13,
      RegressionTestSuiteName: 'Pay my Bill : Statements and Balances',
      RiskLevelId: 6,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 14,
      RegressionTestSuiteName: 'Pay my Bill : Statements and Balances - Intergy',
      RiskLevelId: 6,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 15,
      RegressionTestSuiteName: 'New User Registration',
      RiskLevelId: 5,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 16,
      RegressionTestSuiteName: 'New User Registration - Intergy',
      RiskLevelId: 5,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 17,
      RegressionTestSuiteName: 'My Health: Chart History',
      RiskLevelId: 3,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 18,
      RegressionTestSuiteName: 'My Health: Chart History - Intergy',
      RiskLevelId: 3,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 19,
      RegressionTestSuiteName: 'My Health: Health History Forms',
      RiskLevelId: 4,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 20,
      RegressionTestSuiteName: 'My Profile: My Information',
      RiskLevelId: 3,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 21,
      RegressionTestSuiteName: 'My Profile: My Information - Intergy',
      RiskLevelId: 3,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 22,
      RegressionTestSuiteName: 'My Profile: My Insurance',
      RiskLevelId: 1,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 23,
      RegressionTestSuiteName: 'My Profile: My Insurance - Intergy',
      RiskLevelId: 1,
      IsCore: 0,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 24,
      RegressionTestSuiteName: 'My Appointments: Scheduled',
      RiskLevelId: 2,
      IsCore: 0,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 25,
      RegressionTestSuiteName: 'My Appointments: Scheduled - Intergy',
      RiskLevelId: 2,
      IsCore: 0,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 26,
      RegressionTestSuiteName: 'Reminders',
      RiskLevelId: 1,
      IsCore: 0,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 27,
      RegressionTestSuiteName: 'My Health: My Visits',
      RiskLevelId: 4,
      IsCore: 0,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 28,
      RegressionTestSuiteName: 'My Health: My Visits - Intergy',
      RiskLevelId: 4,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 29,
      RegressionTestSuiteName: 'EMPI(3 Test Suites)',
      RiskLevelId: 6,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 0,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 30,
      RegressionTestSuiteName: 'Setup: Appointments',
      RiskLevelId: 4,
      IsCore: 1,
      IsDeviceBlind: 1,
      IsUserTypeBlind: 1,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 31,
      RegressionTestSuiteName: 'Setup:Enable Connections',
      RiskLevelId: 4,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 1,
      OmitFromMobile: 1
    },
    {
      RegressionTestSuiteId: 32,
      RegressionTestSuiteName: 'Admin Misc',
      RiskLevelId: 3,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 1,
      OmitFromMobile: 1
    },
    {
      RegressionTestSuiteId: 33,
      RegressionTestSuiteName: 'Content Disclaimer',
      RiskLevelId: 3,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 1,
      OmitFromMobile: 1
    },
    {
      RegressionTestSuiteId: 34,
      RegressionTestSuiteName: 'Users',
      RiskLevelId: 4,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 1,
      OmitFromMobile: 1
    },
    {
      RegressionTestSuiteId: 35,
      RegressionTestSuiteName: 'Visual Cron Jobs',
      RiskLevelId: 3,
      IsCore: 1,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 1,
      OmitFromMobile: 1
    },
    {
      RegressionTestSuiteId: 36,
      RegressionTestSuiteName: 'Intergy locations and Providers',
      RiskLevelId: 3,
      IsCore: 1,
      IsDeviceBlind: 1,
      IsUserTypeBlind: 1,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 37,
      RegressionTestSuiteName: 'API Testing',
      RiskLevelId: 3,
      IsCore: 1,
      IsDeviceBlind: 1,
      IsUserTypeBlind: 1,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 38,
      RegressionTestSuiteName: 'PAPI Testing for Intergy',
      RiskLevelId: 3,
      IsCore: 1,
      IsDeviceBlind: 1,
      IsUserTypeBlind: 1,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 39,
      RegressionTestSuiteName: 'MU Measures(2 Test Suites)',
      RiskLevelId: 3,
      IsCore: 1,
      IsDeviceBlind: 1,
      IsUserTypeBlind: 1,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 40,
      RegressionTestSuiteName: 'MU Measures - Intergy',
      RiskLevelId: 3,
      IsCore: 1,
      IsDeviceBlind: 1,
      IsUserTypeBlind: 1,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 41,
      RegressionTestSuiteName: 'Com. Log',
      RiskLevelId: 2,
      IsCore: 1,
      IsDeviceBlind: 1,
      IsUserTypeBlind: 1,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 42,
      RegressionTestSuiteName: 'Setup: Appearance',
      RiskLevelId: 2,
      IsCore: 0,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 1,
      OmitFromMobile: 1
    },
    {
      RegressionTestSuiteId: 43,
      RegressionTestSuiteName: 'Setup: Practice Settings',
      RiskLevelId: 2,
      IsCore: 0,
      IsDeviceBlind: 0,
      IsUserTypeBlind: 1,
      OmitFromMobile: 1
    },
    {
      RegressionTestSuiteId: 44,
      RegressionTestSuiteName: 'Portal Management Tool',
      RiskLevelId: 2,
      IsCore: 0,
      IsDeviceBlind: 1,
      IsUserTypeBlind: 1,
      OmitFromMobile: 1
    },
    {
      RegressionTestSuiteId: 45,
      RegressionTestSuiteName: 'Security',
      RiskLevelId: 6,
      IsCore: 0,
      IsDeviceBlind: 1,
      IsUserTypeBlind: 1,
      OmitFromMobile: 0
    },
    {
      RegressionTestSuiteId: 48,
      RegressionTestSuiteName: 'Performance',
      RiskLevelId: 4,
      IsCore: 1,
      IsDeviceBlind: 1,
      IsUserTypeBlind: 1,
      OmitFromMobile: 0
    }
  ]
};