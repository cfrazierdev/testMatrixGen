import { Component } from '@angular/core';

import { MatrixGeneratorService } from '../shared/index';

@Component({
  selector: 'gp-test-generator',
  templateUrl: 'app/+test-generator/test-generator.component.html'
})
export class TestGeneratorComponent {
  constructor(private matrixGeneratorService: MatrixGeneratorService) {}
}