import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService } from '../+database/database.service';
import { SessionService, UserType, MatrixGeneratorService } from '../shared/index';
import { base } from '../routes';

@Component({
  selector: 'gp-user-type',
  templateUrl: 'app/+user-type/user-type.component.html',
})
export class UserTypeComponent implements OnInit {
  private defaultUserTypes: UserType[];

  constructor(private databaseService: DatabaseService,
              private sessionService: SessionService,
              private matrixGeneratorService: MatrixGeneratorService,
              private ngZone: NgZone,
              private router: Router) {}

  ngOnInit() {
    if(!this.sessionService.session.selectedProductRelease
       || !this.sessionService.session.regressionTests
       || !this.sessionService.session.browsers) {
      this.router.navigate([base]);
    }
  }

  onBack() {
    this.router.navigate(['browsers']);
  }

  onGenerate() {
    this.matrixGeneratorService.generateMatrix();
    //this.router.navigate(['']);
  }

  onReset() {
    this.databaseService.getUserTypes(this.onUserTypes.bind(this));
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
