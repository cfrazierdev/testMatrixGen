import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ProductRelease } from '../shared/index';
import '../shared/utilities/rxjs-operators';

@Injectable()
export class ProductReleaseService {
  private uri: string;

  constructor(private http: Http) {
    this.uri = 'https://localhost/RegressionMatrix/api/ProductReleases';
  }

  getProductReleases(): Observable<ProductRelease[]> {
    return this.http.get(this.uri)
      .map(this.handleData)
      .share()
      .catch(this.handleError);
  }

  private handleData(res: Response) {
    let body = res.json();
    return body.Content || {};
  }

  private handleError(error: any) {
    let errorMsg = error.message || error.statusText || 'Server error';
    console.error('Product releases call failed: ' + errorMsg);
    return Observable.throw(errorMsg);
  }
}
