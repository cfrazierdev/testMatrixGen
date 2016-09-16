import { Component, NgZone, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { SessionService } from './shared/index';
import { DatabaseService } from './+database/database.service';

@Component({
  selector: 'gp-app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent implements OnInit {
    constructor(private router: Router,
                private sessionService: SessionService,
                private databaseService: DatabaseService,
                private ngZone: NgZone) {}

    ngOnInit() {
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
