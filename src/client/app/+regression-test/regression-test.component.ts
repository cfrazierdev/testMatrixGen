import { 
  Component,
  OnInit,
  Input,
  trigger,
  state,
  style,
  transition,
  animate 
} from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService } from '../+database/database.service';
import { SessionService, RegressionTest, GridComponent } from '../shared/index';
import { base } from '../routes';

@Component({
  selector: 'gp-regression-test',
  templateUrl: 'app/+regression-test/regression-test.component.html',
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
export class RegressionTestComponent implements OnInit {
  @Input() isActive: boolean;
  private gridOptions: any;
  showAdd: boolean = false;
  private defaultRegressionTests: RegressionTest[];
  private regressionTestHeaders: any = [
    {
      headerName: 'Regression Test Name',
      field: 'RegressionTestSuiteName',
      editable: true,
      width: 400,
      sort: 'asc',
      sortedAt: 1,
      filter: 'text',
      filterParams: { apply: false, newRowsAction: 'keep' },
    },
    {
      headerName: 'Risk Level',
      field: 'RiskLevelId',
      cellRenderer: this.selectRenderer,
      width: 100,
      sort: 'desc',
      sortedAt: 0,
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
      params.node.data[params.colDef.field] = select.selectedIndex + 1;
      params.node.setSelected(true, true);
    };

    root.appendChild(select);

    return root;
  }

  constructor(private databaseService: DatabaseService,
              private sessionService: SessionService,
              private router: Router) {}

  ngOnInit() {
    if(!this.sessionService.session.selectedProductRelease) {
      this.router.navigate([base]);
    }

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
      singleClickEdit: true,
      debug: false,
      rowSelection: 'single',
      headerHeight: 54,
      onGridSizeChanged: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      onGridReady: () => {
        if(this.sessionService.session.regressionTests) {
          this.onGettingData(null, this.sessionService.session.regressionTests);
        } else {
          this.getPracticeData();
        }
      }
    };
  }

  getPracticeData() {
    this.gridOptions.api.showLoadingOverlay();
    this.databaseService.getRegressionTests(this.onGettingData.bind(this));
  }

  onGettingData(error: any, tests: any) {
    this.defaultRegressionTests = JSON.parse(JSON.stringify(tests));
    this.sessionService.session.regressionTests = tests;

    this.gridOptions.api.setRowData(this.sessionService.session.regressionTests);
    this.gridOptions.api.refreshHeader();
    this.gridOptions.api.sizeColumnsToFit();
  }

  onAdd() {
    this.showAdd = true;
  }

  onCancel(event: any) {
    this.showAdd = event;
  }

  onUpdate(event: any) {
    this.getPracticeData();
  }

  onSave() {
    this.databaseService.updateRegressionTests(this.sessionService.session.regressionTests);
  }
}
