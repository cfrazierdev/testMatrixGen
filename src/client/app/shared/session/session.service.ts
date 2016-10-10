import { Injectable } from '@angular/core';

import { Session } from './session';

@Injectable()
export class SessionService {
  session: Session = new Session();

  getTally(): number {
    let sum = 0;

    if(this.session.browsers) {
      this.session.browsers.forEach((browser: any) => {
        if(browser.BrowserPercentageWeight) {
          sum += parseFloat(browser.BrowserPercentageWeight.toFixed(2));
        }
      });
    }

    return sum;
  }
}
