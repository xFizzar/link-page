import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {App} from '../components/objects/interfaces';
import {Observable, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() {
  }

  http = inject(HttpClient)

  private readonly baseUrl = environment.baseURL;
  private readonly _apps = signal<App[]>([]);
  readonly apps = this._apps.asReadonly();

  getAppByName(name: string): Observable<App> {
    const cached = this._apps().find(p => p.name === name)
    if (cached)
      return of(cached);
    // cache miss
    return this.http
      .get<App>(`${this.baseUrl}/apps/${name}`)
      .pipe(
        tap(app =>
          this._apps.set([...this._apps(), app]))
      );
  }

  getAllApps(): Observable<App[]> {
    return this.http
      .get<App[]>(`${this.baseUrl}/apps`)
      .pipe(
        tap(apps => {
          this._apps.set(this._apps().concat(apps));
        })
      )
  }
}
