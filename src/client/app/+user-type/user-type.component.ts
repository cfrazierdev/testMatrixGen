import { 
  Component,
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
import { SessionService, UserType, MatrixGeneratorService } from '../shared/index';
import { base } from '../routes';

@Component({
  selector: 'gp-user-type',
  templateUrl: 'app/+user-type/user-type.component.html',
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
export class UserTypeComponent {
  @Input() isActive: boolean;

  constructor(private databaseService: DatabaseService,
              private sessionService: SessionService,
              private ngZone: NgZone) {}

  onReset() {
    this.databaseService.getUserTypes(this.onUserTypes.bind(this));
  }

  onSave() {
    this.databaseService.updateUserTypes(this.sessionService.session.userTypes);
  }

  onUserTypes(error: any, userTypes: any) {
    if(error) {
      console.error(error);
    } else {
      this.ngZone.run(() => {
        this.sessionService.session.userTypes = userTypes;
      });
    }
  }
}
