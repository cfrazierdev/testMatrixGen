import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserTypeService } from './user-type.service';
import { SessionService, UserType } from '../shared/index';

@Component({
  selector: 'gp-user-type',
  templateUrl: 'app/+user-type/user-type.component.html',
  providers: [UserTypeService]
})
export class UserTypeComponent implements OnInit {
  private defaultUserTypes: UserType[];

  constructor(private userTypeService: UserTypeService,
              private sessionService: SessionService,
              private router: Router) {}

  ngOnInit() {
    if(!this.sessionService.session.productRelease
       || !this.sessionService.session.regressionTests
       || !this.sessionService.session.browsers) {
      this.router.navigate(['']);
    }

    this.userTypeService.getUserTypes().subscribe(results => {
      this.defaultUserTypes = JSON.parse(JSON.stringify(results));
      this.sessionService.session.userTypes = results;
    });
  }

  onBack() {
    this.router.navigate(['browsers']);
  }

  onGenerate() {
    this.router.navigate(['']);
  }

  onReset() {
    this.sessionService.session.userTypes = JSON.parse(JSON.stringify(this.defaultUserTypes));
  }
}
