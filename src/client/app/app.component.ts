import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { SessionService } from './shared/index';

@Component({
  selector: 'gp-app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [SessionService]
})
export class AppComponent {
    constructor(private router: Router,
                private sessionService: SessionService) {}
}
