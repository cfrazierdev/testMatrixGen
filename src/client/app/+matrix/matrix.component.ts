import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { MatrixGeneratorService, FinalTest, GridComponent } from '../shared/index';
import { base } from '../routes';

@Component({
  selector: 'gp-matrix',
  templateUrl: 'app/+matrix/matrix.component.html',
})
export class MatrixComponent implements OnInit, OnChanges {
  @Input() tests: any;
  private gridOptions: any;
  private regressionTestHeaders: any = [
    {
      headerName: 'Regression Test',
      field: 'test.RegressionTestSuiteName',
      editable: true,
      width: 300,
      sort: 'asc',
      sortedAt: 1,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Risk Level',
      field: 'test.RiskLevelId',
      cellRenderer: this.selectRenderer,
      width: 200,
      sort: 'desc',
      sortedAt: 0,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Patient with 1 own account',
      valueGetter: this.platformGetter,
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Patient with 2 own accounts (different practice)',
      valueGetter: this.platformGetter,
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Patient with 1 authorized user account (same practice)',
      valueGetter: this.platformGetter,
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Patient with 1 authorized user account (different practice)',
      valueGetter: this.platformGetter,
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'User with 1 authorized user account',
      valueGetter: this.platformGetter,
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'User with 2 authorized user accounts (same practice)',
      valueGetter: this.platformGetter,
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'User with 2 authorized user accounts (different practice)',
      valueGetter: this.platformGetter,
      width: 200,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    }
  ];

  constructor(private matrixGeneratorService: MatrixGeneratorService) {}

  ngOnInit() {
    this.createGridOptions();
  }

  ngOnChanges(changes: any) {
    if(this.gridOptions) {
      this.gridOptions.api.setRowData(this.tests);
      this.gridOptions.api.refreshHeader();
      this.gridOptions.api.sizeColumnsToFit();
    }
  }

  createGridOptions(): any {
    this.gridOptions = {
      columnDefs: this.regressionTestHeaders,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      suppressMenuColumnPanel: true,
      suppressMenuHide: true,
      singleClickEdit: true,
      debug: false,
      rowSelection: 'single',
      headerHeight: 54,
      onGridSizeChanged: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      onGridReady: () => {
        this.gridOptions.api.setRowData(this.matrixGeneratorService.matrixTests);
        this.gridOptions.api.refreshHeader();
        this.gridOptions.api.sizeColumnsToFit();
      }
    };
  }

  selectRenderer(params: any) {
    console.log(params);
    let root = document.createElement('div');
    let select = document.createElement('select');
    let options = ['1', '2', '3', '4', '6', '9'];

    for(let i = 0; i < options.length; i++) {
      let option = document.createElement('option');
      option.text = options[i];
      option.value = options[i];
      select.appendChild(option);
    }

    select.selectedIndex = params.value - 1;

    select.onchange = () => {
      params.node.data[params.colDef.field] = select.selectedIndex;
    };

    root.appendChild(select);

    return root;
  }

  private platformGetter(params: any) {
    return (params.data.userType && params.data.userType.UserTypeDescription === params.colDef.headerName) ? params.data.test.Platform : '';
  }

  private testIdComparator(testName1: any, testName2: any, rowNode1: any, rowNode2:any) {
    return rowNode1.data.test.RegressionTestSuiteId - rowNode2.data.test.RegressionTestSuiteId;
  }
}
