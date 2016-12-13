import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class MatrixExporterService {
  exportMatrix: Subject<any> = new Subject();
  private exporter: any;

  constructor() {
    this.exporter = (<any>window)['module'].exports.exporter;
  }

  exportToExcel(csvData: any, version: any) {
    this.exporter.export(csvData, version);
  }
}
