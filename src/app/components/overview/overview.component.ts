import {Component, inject, signal} from '@angular/core';
import {AppComponent} from '../app/app.component';
import {App} from '../objects/interfaces';
import {HttpService} from '../../services/http.service';
import {Router} from '@angular/router';
import {ProxmoxHttpService} from '../../services/proxmox-http.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-overview',
  imports: [
    AppComponent,
    JsonPipe
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})

export class OverviewComponent {

  http = inject(HttpService)
  protected proxmox = inject(ProxmoxHttpService)
  router = inject(Router);

  constructor() {
    this.http.getAllApps().subscribe({
      next: () => {
        let temp: App[] = this.http.apps().map(item => ({
          ...item,
          imageURL: item.imageURL + "/download",
        }));

        this.hosts.set(temp.filter(value => value.type == "HOST"));
        this.LXCs.set(temp.filter(value => value.type == "LXC"));
        this.VMs.set(temp.filter(value => value.type == "VM"));
      }
    })

    this.getStatus()
  }

  hosts = signal<App[]>([]);
  LXCs = signal<App[]>([]);
  VMs = signal<App[]>([]);


  getChunks(array: App[], chunkSize: number) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;

  }

  navigateToCreatePage() {
    this.router.navigate(['/createApp']);
  }

  status = signal<Object>({});

  getStatus() {
    return this.proxmox.getStatus()
      .subscribe(
        status => {
          this.status.set(status);
        }
      )
  }

}
