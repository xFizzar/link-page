import {Component, inject, signal} from '@angular/core';
import {AppComponent} from '../app/app.component';
import {App} from '../objects/interfaces';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-overview',
  imports: [
    AppComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})

export class OverviewComponent {

  http = inject(HttpService)

  constructor() {
   this.http.getAllApps().subscribe({
     next: data => {
       console.log(data);
       let temp = data.map(item => {
         item.imageURL = item.imageURL + "/download"
         return item;
       });
       this.hosts.set(temp.filter(value => value.type = "HOST"));
       this.LXCs.set(temp.filter(value => value.type = "LXC"));
       this.VMs.set(temp.filter(value => value.type = "VM"));
       // TODO fix types
     }
   })
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

}
