import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserType } from '../shared/index';
import '../shared/utilities/rxjs-operators';

@Injectable()
export class UserTypeService {
  private uri: string;

  constructor(private http: Http) {
    this.uri = 'https://localhost/RegressionMatrix/api/UserTypes';
  }

  getUserTypes(): Observable<UserType[]> {
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
    console.error('Regression tests call failed: ' + errorMsg);
    return Observable.throw(errorMsg);
  }
}
