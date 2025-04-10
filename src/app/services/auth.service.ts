import {Injectable, signal} from '@angular/core';
import {of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _user = signal('');
  readonly user = this._user.asReadonly();

  constructor() {
  }

  login(username: string, password: string) {
    // todo validate with backend
    // todo make backend

    if (username == "WEIX" && password == "pw") {
      this._user.set(username)
      return of(true)
    }

    return throwError(() => {
      return new Error("Invalid username or password");
    })
  }

  public isLoggedIn() {
    return this.user() !== ''
  }

}
