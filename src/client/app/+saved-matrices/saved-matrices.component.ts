import { 
  Component,
  OnInit,
  Input,
  NgZone,
  trigger,
  state,
  style,
  transition,
  animate
 } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService } from '../+database/database.service';
import { SessionService, Browser, MatrixGeneratorService } from '../shared/index';
import { base } from '../routes';

@Component({
  selector: 'gp-saved-matrices',
  templateUrl: 'app/+saved-matrices/saved-matrices.component.html',
  animations: [
    trigger('active', [
      state('true', style({transform: 'translateX(0%)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class SavedMatricesComponent implements OnInit {
  @Input() isActive: boolean;

  private gridOptions: any;
  private regressionTestHeaders: any = [
    {
      headerName: 'Version',
      field: 'ProductReleaseVersion',
      sort: 'desc',
      sortedAt: 1,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Date Saved',
      field: 'DateCreated',
      sort: 'desc',
      sortedAt: 0,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    }
  ];

  constructor(private sessionService: SessionService,
              private databaseService: DatabaseService,
              private matrixGeneratorService: MatrixGeneratorService,
              private ngZone: NgZone) {}

  ngOnInit() {
    this.createGridOptions();
  }

  createGridOptions(): any {
    this.gridOptions = {
      columnDefs: this.regressionTestHeaders,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      suppressMenuColumnPanel: true,
      suppressMenuHide: true,
      debug: false,
      rowSelection: 'single',
      headerHeight: 54,
      onGridSizeChanged: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      onGridReady: () => {
        this.databaseService.getRegressionMatrixList(this.onSavedMatrixList.bind(this));
      }
    };
  }

  onLoad() {
    let rows = this.gridOptions.api.getSelectedRows();

    if(rows[0]) this.databaseService.getRegressionMatrix(rows[0].RegressionMatrixId, this.onSavedMatrix.bind(this));
  }

  onSavedMatrixList(error: any, matrices: any) {
    if(error) {
      console.error(error);
    } else {
      this.ngZone.run(() => {
        this.gridOptions.api.setRowData(matrices);
      });
    }
  }

  onSavedMatrix(error: any, matrix: any) {
    if(error) {
      console.error(error);
    } else {
      this.ngZone.run(() => {
        this.sessionService.session.selectedProductRelease = this.sessionService.session.productReleases.find(
          (release) => release.ProductReleaseVersion === matrix[0].ProductReleaseVersion
        );

        this.matrixGeneratorService.generateMatrix(JSON.parse(matrix[0].RegressionMatrix));
      });
    }
  }
}
