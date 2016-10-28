import { Component, Output, EventEmitter } from '@angular/core';

import { DatabaseService } from '../../+database/database.service';
import { RegressionTest } from '../../shared/index';

@Component({
  selector: 'gp-test-creator',
  templateUrl: 'app/+regression-test/regression-test-creator/regression.test.creator.component.html'
})
export class RegressionTestCreatorComponent {
  @Output() show = new EventEmitter();
  @Output() update = new EventEmitter();
  regressionTestSuiteName: string;
  riskLevelId: number = 1;
  isCore: boolean = false;
  isDeviceBlind: boolean = false;
  isUserTypeBlind: boolean = false;
  omitFromMobile: boolean = false;

  constructor(private databaseService: DatabaseService) {}

  onSave() {
    let test = [new RegressionTest({
      RegressionTestSuiteName: this.regressionTestSuiteName,
      RiskLevelId: this.riskLevelId,
      IsCore: this.isCore,
      IsDeviceBlind: this.isDeviceBlind,
      IsUserTypeBlind: this.isUserTypeBlind,
      OmitFromMobile: this.omitFromMobile
    })];

    this.databaseService.updateRegressionTests(test);
    this.show.emit(false);
    this.update.emit(true);
  }

  onCancel() {
    this.show.emit(false);
  }
}