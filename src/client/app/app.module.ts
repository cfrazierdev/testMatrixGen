import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { AgGridModule } from 'ag-grid-ng2/main';

import { routing } from './routes';

import { ProductReleaseComponent } from './+product-release/index';
import { RegressionTestComponent, RegressionTestCreatorComponent } from './+regression-test/index';
import { BrowserComponent } from './+browser/index';
import { UserTypeComponent } from './+user-type/index';
import { ControlPanelComponent } from './+control-panel/index';
import { MatrixComponent } from './+matrix/index';
import { TestGeneratorComponent } from './+test-generator/index';
import {
  GridComponent,
  LeftMenuComponent,
  SessionService,
  MatrixGeneratorService,
  MatrixExporterService
} from './shared/index';
import { DatabaseService } from './+database/database.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductReleaseComponent,
    RegressionTestComponent,
    RegressionTestCreatorComponent,
    BrowserComponent,
    UserTypeComponent,
    GridComponent,
    LeftMenuComponent,
    ControlPanelComponent,
    MatrixComponent,
    TestGeneratorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    routing,
    AgGridModule.forRoot()
  ],
  providers: [
    DatabaseService,
    SessionService,
    MatrixGeneratorService,
    MatrixExporterService,
    {
        provide: APP_BASE_HREF,
        useValue: '/'
    },
    {
        provide: 'CanAlwaysActivateGuard',
        useValue: () => {
          return true;
        }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
