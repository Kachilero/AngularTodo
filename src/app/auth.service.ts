/* tslint:disable */
/**
 * Authentication Service
 * Handles the authentication logic and then passes it on to the session service
 */
/* tslint:enable */
import { Injectable } from '@angular/core';
import { SessionServiceService } from './session-service.service';

@Injectable()
export class AuthService {

  constructor(private session: SessionServiceService) { }

  public isSignedIn() {
    return !!this.session.accessToken;
  }

  public doSignOut() {
    this.session.destroy();
  }

  public doSignIn(accessToken: string, password: string) {
    if ((!accessToken) || (name)) {
      return;
    }
    this.session.accessToken = accessToken;
    this.session.name = name;
  }
}
