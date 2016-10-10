import { 
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate 
} from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../shared/index';

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

  constructor(private sessionService: SessionService) {}

}
