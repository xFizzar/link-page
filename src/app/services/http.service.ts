import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {App, CreateApp} from '../components/objects/interfaces';
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
          apps.forEach(value => {
            if (this._apps().filter(value1 => value1.id == value.id).length == 0) {
              this._apps.set([...this._apps(), value]);
            }
          })
          this._apps.set(this._apps().sort((a, b) => a.id - b.id))
        })
      )
  }

  createApp(app: CreateApp): Observable<App> {
    return this.http
      .post<App>(`${this.baseUrl}/createApp`, app);
  }
}
