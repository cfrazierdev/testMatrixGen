import { 
  Component,
  EventEmitter,
  Input,
  Output,
  NgZone,
  trigger,
  state,
  style,
  transition,
  animate 
} from '@angular/core';
import { Router } from '@angular/router';

import { SessionService, ProductRelease } from '../shared/index';
import { DatabaseService } from '../+database/database.service';

@Component({
  selector: 'gp-product-release',
  templateUrl: 'app/+product-release/product-release.component.html',
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
export class ProductReleaseComponent {
  @Input() isActive: boolean;
  productReleaseVersion: string;
  successMsg: string;

  constructor(private ngZone: NgZone,
              private sessionService: SessionService,
              private databaseService: DatabaseService) {}

  onSave() {
    let release = [new ProductRelease({
      ProductReleaseVersion: this.productReleaseVersion
    })];

    this.databaseService.updateProductReleases(release);
    this.productReleaseVersion = "";
    this.databaseService.getProductReleases(this.onProductReleases.bind(this));
  }

  private onProductReleases(error: any, productReleases: any) {
    this.ngZone.run(() => {
      this.sessionService.session.selectedProductRelease = productReleases[0];
      this.sessionService.session.productReleases = productReleases;
    });
  }
}
