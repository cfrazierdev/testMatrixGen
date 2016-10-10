import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gp-left-menu',
  templateUrl: 'app/shared/left-menu/left-menu.component.html',
})
export class LeftMenuComponent {
  selectedItem: string;

  onClick(item: string) {
    if(this.selectedItem === item) {
      this.selectedItem = '';
    } else {
      this.selectedItem = item;
    }
  }
}
