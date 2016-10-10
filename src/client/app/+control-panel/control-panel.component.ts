import { Component, NgZone } from '@angular/core';

import { MatrixGeneratorService, SessionService } from '../shared/index';
import { DatabaseService } from '../+database/database.service';

@Component({
  selector: 'gp-control-panel',
  templateUrl: 'app/+control-panel/control-panel.component.html'
})
export class ControlPanelComponent {
  constructor(private matrixGeneratorService: MatrixGeneratorService,
              private databaseService: DatabaseService,
              private sessionService: SessionService,
              private ngZone: NgZone) {}

  onGenerate() {
    this.matrixGeneratorService.generateMatrix();
  }

  onResetAll() {
    this.databaseService.getProductReleases(this.onProductReleases.bind(this));
      this.databaseService.getRegressionTests(this.onRegressionTests.bind(this));
      this.databaseService.getBrowsers(this.onBrowsers.bind(this));
      this.databaseService.getUserTypes(this.onUserTypes.bind(this));
    }

    private onProductReleases(error: any, productReleases: any) {
      this.ngZone.run(() => {
        this.sessionService.session.selectedProductRelease = productReleases[0];
        this.sessionService.session.productReleases = productReleases;
      });
    }

    private onRegressionTests(error: any, tests: any) {
      this.ngZone.run(() => {
       this.sessionService.session.regressionTests = tests;
      });
    }

    private onBrowsers(error: any, browsers: any) {
      this.ngZone.run(() => {
        this.sessionService.session.browsers = browsers;
      });
    }

    private onUserTypes(error: any, userTypes: any) {
      this.ngZone.run(() => {
        this.sessionService.session.userTypes = userTypes;
      });
    }
}
