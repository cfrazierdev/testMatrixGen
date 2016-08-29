import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegressionTestService } from './regression-test.service';
import { SessionService, RegressionTest, GridComponent, Header } from '../shared/index';

@Component({
  selector: 'gp-regression-test',
  templateUrl: 'app/+regression-test/regression-test.component.html',
  providers: [RegressionTestService],
  directives: [GridComponent]
})
export class RegressionTestComponent implements OnInit {
  private regressionTests: RegressionTest[];
  private gridOptions: any;
  private regressionTestHeaders: any = [
    {
      headerName: 'Regression Test Name',
      headerCellTemplate: this.headerTemplate,
      field: 'RegressionTestSuiteName',
      width: 300,
      sort: 'asc',
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Risk Lvl',
      headerCellTemplate: this.headerTemplate,
      field: 'RiskLevelId',
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Core',
      //headerCellTemplate: this.headerTemplate,
      field: 'IsCore',
      template: '<input type="checkbox" />',
      //checkboxSelection: true,
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Device Blind',
      headerCellTemplate: this.headerTemplate,
      field: 'IsDeviceBlind',
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'UserTypeBlind',
      headerCellTemplate: this.headerTemplate,
      field: 'IsUserTypeBlind',
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'OmitFromMobile',
      headerCellTemplate: this.headerTemplate,
      field: 'OmitFromMobile',
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    }
  ];

  constructor(private regressionTestService: RegressionTestService,
              private sessionService: SessionService,
              private router: Router) {}

  headerTemplate(params: any): HTMLElement {
    let eCell = document.createElement('div');
    let model: any = null;
    let filterAPI: any = null;
    let filters: string = '';
    let filterIsActive: string = '';

    filterAPI = params.api.getFilterApi(params.column.colId);
    model = filterAPI.getModel();
    if (model && model.filter) {
      filters = model.label;
      filterIsActive = 'is-active';
    }

    eCell.innerHTML = `
      <div class="ag-header-cell-resize" id="agResizeBar"></div>
      <span id="agMenu" class="ag-header-icon ag-header-cell-menu-button ${filterIsActive}">
        <svg width="12" height="12">
          <rect y="0" width="12" height="2" class="ag-header-icon"></rect>
          <rect y="5" width="12" height="2" class="ag-header-icon"></rect>
          <rect y="10" width="12" height="2" class="ag-header-icon"></rect>
        </svg>
      </span>
      <div class="ag-header-cell-label" id="agHeaderCellLabel">
        <span class="ag-header-icon ag-sort-ascending-icon ag-hidden" id="agSortAsc">
          <svg height="10" width="10">
            <polygon points="0,10 5,0 10,10"></polygon>
          </svg>
        </span>
        <span class="ag-header-icon ag-sort-descending-icon" id="agSortDesc">
          <svg height="10" width="10">
            <polygon points="0,0 5,10 10,0"></polygon>
          </svg>
        </span>
        <span id="agFilter">
          <svg width="10" height="10">
            <polygon points="0,0 4,4 4,10 6,10 6,4 10,0" class="ag-header-icon"></polygon>
          </svg>
        </span>
        <span class="ag-header-icon ag-sort-none-icon ag-hidden" id="agNoSort">
          <svg height="10" width="10">
            <polygon points="0,4 5,0 10,4"></polygon>
            <polygon points="0,6 5,10 10,6"></polygon>
          </svg>
        </span>
        <span class="ag-header-cell-text" id="agText">
        </span>
      </div>
      <div class="ag-header-filter-label" id="agHeaderFilterLabel">${filters || ''}</div>`;

    return eCell;
  };

  ngOnInit() {
    if(!this.sessionService.session.productRelease) {
      this.router.navigate(['']);
    }

    this.createGridOptions();
    this.regressionTestService.getRegressionTests().subscribe(results => {
      this.regressionTests = results;
    });
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
      onSelectionChanged: this.rowSelected.bind(this),
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
    this.regressionTests = tests;

    this.gridOptions.api.setRowData(this.regressionTests);
    this.gridOptions.api.refreshHeader();
    this.gridOptions.api.sizeColumnsToFit();
  }

  onErrorGettingData(err: any) {
    console.log(err);
  }

  rowSelected() {
    let row = this.gridOptions.api.getSelectedRows()[0];

    if(row) {
      console.log(row);
    }
  }

  onStart() {
    //this.router.navigate()
  }
}
