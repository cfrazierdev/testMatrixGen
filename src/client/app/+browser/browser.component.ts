import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BrowserService } from './browser.service';
import { SessionService, Browser } from '../shared/index';

@Component({
  selector: 'gp-browser',
  templateUrl: 'app/+browser/browser.component.html',
  providers: [BrowserService]
})
export class BrowserComponent implements OnInit {
  private defaultBrowsers: Browser[];

  constructor(private browserService: BrowserService,
              private sessionService: SessionService,
              private router: Router) {}

  ngOnInit() {
    if(!this.sessionService.session.productRelease || !this.sessionService.session.regressionTests) {
      this.router.navigate(['']);
    }

    this.browserService.getBrowsers().subscribe(results => {
      this.defaultBrowsers = JSON.parse(JSON.stringify(results));
      this.sessionService.session.browsers = results;
    });
  }

  onBack() {
    this.router.navigate(['tests']);
  }

  onNext() {
    this.router.navigate(['userTypes']);
  }

  onReset() {
    this.sessionService.session.browsers = JSON.parse(JSON.stringify(this.defaultBrowsers));
  }
}
