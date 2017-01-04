import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  Input
} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import {
  MatrixGeneratorService,
  MatrixExporterService,
  FinalTest,
  GridComponent
} from '../shared/index';
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
      width: 300,
      sort: 'asc',
      sortedAt: 1,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Risk Level',
      field: 'test.RiskLevelId',
      valueGetter: this.riskLevelGetter.bind(this),
      width: 100,
      sort: 'desc',
      sortedAt: 0,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' }
    },
    {
      headerName: 'Not dependent on user type',
      valueGetter: this.platformGetter,
      newValueHandler: this.textHandler,
      editable: true,
      newValue: null,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Patient with 1 own account',
      valueGetter: this.platformGetter,
      newValueHandler: this.textHandler,
      editable: true,
      newValue: null,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Patient with 2 own accounts (different practice)',
      valueGetter: this.platformGetter,
      newValueHandler: this.textHandler,
      editable: true,
      newValue: null,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Patient with 1 authorized user account (same practice)',
      valueGetter: this.platformGetter,
      newValueHandler: this.textHandler,
      editable: true,
      newValue: null,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Patient with 1 authorized user account (different practice)',
      valueGetter: this.platformGetter,
      newValueHandler: this.textHandler,
      editable: true,
      newValue: null,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'User with 1 authorized user account',
      valueGetter: this.platformGetter,
      newValueHandler: this.textHandler,
      editable: true,
      newValue: null,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'User with 2 authorized user accounts (same practice)',
      valueGetter: this.platformGetter,
      newValueHandler: this.textHandler,
      editable: true,
      newValue: null,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'User with 2 authorized user accounts (different practice)',
      valueGetter: this.platformGetter,
      newValueHandler: this.textHandler,
      editable: true,
      newValue: null,
      width: 180,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    }
  ];

  constructor(private matrixGeneratorService: MatrixGeneratorService,
              private matrixExporterService: MatrixExporterService,
              private sessionService: SessionService) {}

  ngOnInit() {
    this.createGridOptions();
    this.matrixExporterService.exportMatrix.subscribe(() => this.exportToCsv());
    this.matrixGeneratorService.resetMatrix.subscribe(() => this.resetMatrix());
  }

  ngOnDestroy() {
    this.matrixExporterService.exportMatrix.unsubscribe();
    this.matrixGeneratorService.resetMatrix.unsubscribe();
  }

  ngOnChanges(changes: any) {
    if(this.sessionService.session.selectedProductRelease){
      this.regressionTestHeaders[0].headerName = 'Regression Test (Release ' + this.sessionService.session.selectedProductRelease.ProductReleaseVersion + ')';
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
      columnSeparator: ',',
      processCellCallback: this.processCell.bind(this)
    };

    let csvData = this.gridOptions.api.getDataAsCsv(params);
    this.matrixExporterService.exportToExcel(csvData, this.sessionService.session.selectedProductRelease);
  }

  private processCell(params: any) {
    if(params.column.colDef.field === 'test.RiskLevelId') {
      params.value = this.options[params.node.data.test.RiskLevelId - 1];
    }

    return params.value;
  }

  private platformGetter(params: any) {
    if(params.colDef.newValues && params.colDef.newValues[params.node.childIndex]) return params.colDef.newValues[params.node.childIndex];

    return (params.data.userType && params.data.userType.UserTypeDescription === params.colDef.headerName) ? params.data.test.Platform : '';
  }

  private riskLevelGetter(params: any) {
    return this.options[params.data.test.RiskLevelId - 1];
  }

  private testIdComparator(testName1: any, testName2: any, rowNode1: any, rowNode2:any) {
    return rowNode1.data.test.RegressionTestSuiteId - rowNode2.data.test.RegressionTestSuiteId;
  }

  private textHandler(params: any) {
    if(params.newValue.length <= 25 && /^[\w\d\s]*$/.test(params.newValue)) {
      if(!params.colDef.newValues) params.colDef.newValues = [];
      params.colDef.newValues[params.node.childIndex] = params.newValue;
    }
  }

  private resetMatrix() {
    this.regressionTestHeaders.forEach((header: any) => {
      if(header.newValue) header.newValue = null;
      if(header.newValues) header.newValues = null;
    });
  }
}
