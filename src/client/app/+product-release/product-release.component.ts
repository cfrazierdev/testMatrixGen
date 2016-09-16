import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../shared/index';

@Component({
  selector: 'gp-product-release',
  templateUrl: 'app/+product-release/product-release.component.html'
})
export class ProductReleaseComponent {
  constructor(private router: Router,
              private sessionService: SessionService) {}

  onStart() {
    this.router.navigate(['tests']);
  }
}
