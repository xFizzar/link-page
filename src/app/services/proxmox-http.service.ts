import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProxmoxHttpService {

  constructor() { }

  private readonly baseURL = environment.proxmoxURL;
  private readonly nodeURL = environment.proxmoxURL + "/nodes/homeserver";

  private http = inject(HttpClient)


  getStatus() {
    return this.http.get(this.nodeURL + "/status");
  }


}
