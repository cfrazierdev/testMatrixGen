import { Injectable } from '@angular/core';

import { Session } from './session';

@Injectable()
export class SessionService {
  session: Session = new Session();
}
