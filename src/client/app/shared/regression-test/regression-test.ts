export class RegressionTest {
  RegressionTestSuiteId: string;
  RegressionTestSuiteName: string;
  RiskLevelId: string;
  IsCore: boolean;
  IsDeviceBlind: boolean;
  IsUserTypeBlind: boolean;
  OmitFromMobile: boolean;
  Platform: string;

  constructor(params: any) {
    this.RegressionTestSuiteName = params.RegressionTestSuiteName;
    this.RiskLevelId = params.RiskLevelId;
    this.IsCore = params.IsCore;
    this.IsDeviceBlind = params.IsDeviceBlind;
    this.IsUserTypeBlind = params.IsUserTypeBlind;
    this.OmitFromMobile = params.OmitFromMobile;
  }
}
