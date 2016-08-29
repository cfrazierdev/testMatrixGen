import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductReleaseService } from './product-release.service';
import { SessionService, ProductRelease } from '../shared/index';

@Component({
  selector: 'gp-product-release',
  templateUrl: 'app/+product-release/product-release.component.html',
  providers: [ProductReleaseService]
})
export class ProductReleaseComponent implements OnInit {
  private productReleases: ProductRelease[];

  constructor(private productReleaseService: ProductReleaseService,
              private sessionService: SessionService,
              private router: Router) {}

  ngOnInit() {
    this.productReleaseService.getProductReleases().subscribe(results => {
      this.productReleases = results;
      this.sessionService.session.productRelease = results[0];
    });
  }

  onStart() {
    this.router.navigate(['tests']);
  }
}
