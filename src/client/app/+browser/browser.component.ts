import { 
  Component,
  OnInit,
  Input,
  NgZone,
  trigger,
  state,
  style,
  transition,
  animate
 } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService } from '../+database/database.service';
import { SessionService, Browser } from '../shared/index';
import { base } from '../routes';

@Component({
  selector: 'gp-browser',
  templateUrl: 'app/+browser/browser.component.html',
  animations: [
    trigger('active', [
      state('true', style({transform: 'translateX(0%)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class BrowserComponent implements OnInit {
  @Input() isActive: boolean;
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

  onReset() {
    this.databaseService.getBrowsers(this.onBrowsers.bind(this));
  }

  onSave() {
    this.databaseService.updateBrowserPercentages(this.sessionService.session.browsers);
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
