/* tslint:disable */
/**
 * Session Service
 * Handles the storage of session variables provided by the authentication service
 */
/* tslint:enable*/
import { Injectable } from '@angular/core';

@Injectable()
export class SessionServiceService {
  public accessToken: string;
  public name: string;

  constructor() { }

  public destroy(): void {
    this.accessToken = null;
    this.name = null;
  }
}
