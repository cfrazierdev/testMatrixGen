export interface Constants {
  BROWSERS_DEFAULT_VALUES: Browser[];
  PRODUCT_RELEASES_DEFAULT_VALUES: ProductRelease[];
  USER_TYPE_BLIND_HEADER: string;
}

interface ProductRelease {
  ProductReleaseId: number;
  ProductReleaseVersion: string;
}

interface Browser {
  BrowserId: number;
  BrowserName: string;
  BrowserPercentageWeight: number;
}

export const CONSTANTS: Constants = {
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
  USER_TYPE_BLIND_HEADER: 'Not dependent on user type'
}