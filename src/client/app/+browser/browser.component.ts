import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService } from '../+database/database.service';
import { SessionService, Browser } from '../shared/index';
import { base } from '../routes';

@Component({
  selector: 'gp-browser',
  templateUrl: 'app/+browser/browser.component.html'
})
export class BrowserComponent implements OnInit {
  private defaultBrowsers: Browser[];

  constructor(private sessionService: SessionService,
              private databaseService: DatabaseService,
              private router: Router,
              private ngZone: NgZone) {}

  ngOnInit() {
    if(!this.sessionService.session.selectedProductRelease || !this.sessionService.session.regressionTests) {
      this.router.navigate([base]);
    }
  }

  getTally() {
    if(this.sessionService.session.browsers) {
      let sum = 0;

      for(let i = 0; i < this.sessionService.session.browsers.length; i++) {
        sum += this.sessionService.session.browsers[i].BrowserPercentageWeight / 100;
      }

      return sum;
    }

    return 0;
  }

  onBack() {
    this.router.navigate(['tests']);
  }

  onNext() {
    this.router.navigate(['userTypes']);
  }

  onReset() {
    this.databaseService.getBrowsers(this.onBrowsers.bind(this));
  }

  onBrowsers(error: any, browsers: any) {
    if(error) {
      console.error(error);
    } else {
      this.ngZone.run(() => {
        this.sessionService.session.browsers = browsers;
      });
    }
  }
}
