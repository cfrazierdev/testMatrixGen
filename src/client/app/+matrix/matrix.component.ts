import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { MatrixGeneratorService, FinalTest, GridComponent } from '../shared/index';
import { base } from '../routes';

import { SessionService } from '../shared/index';

@Component({
  selector: 'gp-matrix',
  templateUrl: 'app/+matrix/matrix.component.html',
})
export class MatrixComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tests: any;
  private options: any = ['1', '2', '3', '4', '6', '9'];
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
      cellRenderer: this.selectRenderer.bind(this),
      width: 100,
      sort: 'desc',
      sortedAt: 0,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Patient with 1 own account',
      valueGetter: this.platformGetter,
      editable: true,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Patient with 2 own accounts (different practice)',
      valueGetter: this.platformGetter,
      editable: true,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Patient with 1 authorized user account (same practice)',
      valueGetter: this.platformGetter,
      editable: true,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Patient with 1 authorized user account (different practice)',
      valueGetter: this.platformGetter,
      editable: true,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'User with 1 authorized user account',
      valueGetter: this.platformGetter,
      editable: true,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'User with 2 authorized user accounts (same practice)',
      valueGetter: this.platformGetter,
      editable: true,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'User with 2 authorized user accounts (different practice)',
      valueGetter: this.platformGetter,
      editable: true,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    }
  ];

  constructor(private matrixGeneratorService: MatrixGeneratorService,
              private sessionService: SessionService) {}

  ngOnInit() {
    this.createGridOptions();
    this.matrixGeneratorService.exportMatrix.subscribe(() => this.exportToCsv());
  }

  ngOnDestroy() {
    this.matrixGeneratorService.exportMatrix.unsubscribe();
  }

  ngOnChanges(changes: any) {
    if(this.sessionService.session.selectedProductRelease){
      this.regressionTestHeaders[0].headerName = 'Regression Test <br/> release ' + this.sessionService.session.selectedProductRelease.ProductReleaseVersion;
    }
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
      headerHeight: 100,
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
    let root = document.createElement('div');
    let select = document.createElement('select');

    for(let i = 0; i < this.options.length; i++) {
      let option = document.createElement('option');
      option.text = this.options[i];
      option.value = this.options[i];
      select.appendChild(option);
    }

    select.selectedIndex = params.value - 1;

    select.onchange = () => {
      params.node.data[params.colDef.field] = select.selectedIndex + 1;
    };

    root.appendChild(select);

    return root;
  }

  exportToCsv() {
    let params = {
      skipHeader: false,
      skipFooters: false,
      skipGroups: false,
      skipFloatingTop: false,
      skipFloatingBottom: false,
      allColumns: true,
      onlySelected: false,
      suppressQuotes: false,
      fileName: this.sessionService.session.selectedProductRelease.ProductReleaseVersion + '.csv',
      columnSeparator: ','
    };

    this.gridOptions.api.exportDataAsCsv(params);
  }

  private platformGetter(params: any) {
    return (params.data.userType && params.data.userType.UserTypeDescription === params.colDef.headerName) ? params.data.test.Platform : '';
  }

  private testIdComparator(testName1: any, testName2: any, rowNode1: any, rowNode2:any) {
    return rowNode1.data.test.RegressionTestSuiteId - rowNode2.data.test.RegressionTestSuiteId;
  }
}
