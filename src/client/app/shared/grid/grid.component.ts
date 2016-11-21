import { Component, Input } from '@angular/core';

import { AgGridNg2 } from 'ag-grid-ng2/main';
import 'ag-grid-enterprise/main';
import * as AgGridEnterprise from 'ag-grid-enterprise/dist/lib/licenseManager';

@Component({
  selector: 'gp-grid',
  templateUrl: 'app/shared/grid/grid.component.html'
})
export class GridComponent {
  @Input() gridOptions: any;
  private licenseKey: string = 'Greenway_Health_LLC_Site_1Devs__MTQ5OTI5NTYwMDAwMA==3e6c2efea0bd1b0e18c1e7ae203f3181';

  constructor() {
    AgGridEnterprise.LicenseManager.setLicenseKey(this.licenseKey);
  };
}
