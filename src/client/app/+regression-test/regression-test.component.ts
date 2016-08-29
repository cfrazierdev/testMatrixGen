import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegressionTestService } from './regression-test.service';
import { SessionService, RegressionTest, GridComponent } from '../shared/index';

@Component({
  selector: 'gp-regression-test',
  templateUrl: 'app/+regression-test/regression-test.component.html',
  providers: [RegressionTestService],
  directives: [GridComponent]
})
export class RegressionTestComponent implements OnInit {
  //private regressionTests: RegressionTest[];
  private gridOptions: any;
  private defaultRegressionTests: RegressionTest[];
  private regressionTestHeaders: any = [
    {
      headerName: 'Regression Test Name',
      field: 'RegressionTestSuiteName',
      editable: true,
      width: 300,
      sort: 'asc',
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Risk Lvl',
      field: 'RiskLevelId',
      cellRenderer: this.selectRenderer,
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Core',
      field: 'IsCore',
      cellRenderer: this.checkboxRenderer,
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Device Blind',
      field: 'IsDeviceBlind',
      cellRenderer: this.checkboxRenderer,
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'UserTypeBlind',
      field: 'IsUserTypeBlind',
      cellRenderer: this.checkboxRenderer,
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'OmitFromMobile',
      field: 'OmitFromMobile',
      cellRenderer: this.checkboxRenderer,
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    }
  ];

  checkboxRenderer(params: any) {
    let root = document.createElement('div');
    let checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.checked = params.data[params.colDef.field];

    checkbox.onclick = () => {
      params.node.data[params.colDef.field] = +checkbox.checked;
    };

    root.appendChild(checkbox);

    return root;
  }

  selectRenderer(params: any) {
    let root = document.createElement('div');
    let select = document.createElement('select');
    let options = ['1', '2', '3', '4', '6', '9'];

    for(let i = 0; i < options.length; i++) {
      let option = document.createElement('option');
      option.text = options[i];
      option.value = options[i];
      select.appendChild(option);
    }

    select.selectedIndex = params.data[params.colDef.field] - 1;

    select.onchange = () => {
      params.node.data[params.colDef.field] = select.selectedIndex;
    };

    root.appendChild(select);

    return root;
  }

  constructor(private regressionTestService: RegressionTestService,
              private sessionService: SessionService,
              private router: Router) {}

  ngOnInit() {
    if(!this.sessionService.session.productRelease) {
      this.router.navigate(['']);
    }

    this.createGridOptions();
  }

  createGridOptions(): any {
    let _ = this;
    this.gridOptions = {
      columnDefs: _.regressionTestHeaders,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      suppressMenuColumnPanel: true,
      suppressMenuHide: true,
      debug: false,
      rowSelection: 'single',
      //onSelectionChanged: this.rowSelected.bind(this),
      headerHeight: 54,
      onGridSizeChanged: () => {
        _.gridOptions.api.sizeColumnsToFit();
      },
      onGridReady: () => {
        _.getPracticeData();
        _.gridOptions.api.sizeColumnsToFit();
      }
    };
  }

  getPracticeData() {
    this.gridOptions.api.showLoadingOverlay();
    this.regressionTestService.getRegressionTests().subscribe(
      this.onGettingData.bind(this),
      this.onErrorGettingData.bind(this)
    );
  }

  onGettingData(tests: any) {
    this.defaultRegressionTests = JSON.parse(JSON.stringify(tests));
    this.sessionService.session.regressionTests = tests;

    this.gridOptions.api.setRowData(this.sessionService.session.regressionTests);
    this.gridOptions.api.refreshHeader();
    this.gridOptions.api.sizeColumnsToFit();
  }

  onErrorGettingData(err: any) {
    console.log(err);
  }

  onResetToDefault() {
    this.sessionService.session.regressionTests = JSON.parse(JSON.stringify(this.defaultRegressionTests));
    this.gridOptions.api.setRowData(this.sessionService.session.regressionTests);
  }

  onBack() {
    this.router.navigate(['']);
  }

  onNext() {
    this.router.navigate(['browsers']);
  }
}
