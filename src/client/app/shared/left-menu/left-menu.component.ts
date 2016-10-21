import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { MatrixGeneratorService } from '../index';

@Component({
  selector: 'gp-left-menu',
  templateUrl: 'app/shared/left-menu/left-menu.component.html',
})
export class LeftMenuComponent implements DoCheck{
  selectedItem: string;

  constructor(private matrixGeneratorService: MatrixGeneratorService) {}

  ngDoCheck(){
    if(this.matrixGeneratorService.hideLeftMenu == "yes"){
      this.selectedItem = '';
    }
  }

  onClick(item: string) {
    if(this.selectedItem === item) {
      this.selectedItem = '';
    } else {
      this.selectedItem = item;
    }
  }
}
