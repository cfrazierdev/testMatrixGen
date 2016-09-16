import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { HTTP_PROVIDERS } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { provide } from '@angular/core';

import { routing } from './routes';

import { ProductReleaseComponent } from './+product-release/index';
import { RegressionTestComponent } from './+regression-test/index';
import { BrowserComponent } from './+browser/index';
import { UserTypeComponent } from './+user-type/index';
import {
  GridComponent,
  LeftMenuComponent,
  SessionService,
  MatrixGeneratorService
} from './shared/index';
import { DatabaseService } from './+database/database.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductReleaseComponent,
    RegressionTestComponent,
    BrowserComponent,
    UserTypeComponent,
    GridComponent,
    LeftMenuComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    HTTP_PROVIDERS,
    DatabaseService,
    SessionService,
    MatrixGeneratorService,
    provide(APP_BASE_HREF, { useValue: '/' }),
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
