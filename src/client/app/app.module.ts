import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { GridComponent } from './shared/index';

@NgModule({
  declarations: [
    AppComponent,
    ProductReleaseComponent,
    RegressionTestComponent,
    BrowserComponent,
    UserTypeComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    HTTP_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
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
