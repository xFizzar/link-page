import {Component} from '@angular/core';
import {AppComponent} from '../app/app.component';
import {App} from '../objects/interfaces';

@Component({
  selector: 'app-overview',
  imports: [
    AppComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})

export class OverviewComponent {

  host: App = {
    name: "Proxmox VE",
    image: "proxmox.png",
    url: "http://10.0.0.5:8006"
  }

  LXCs: App[] = [
    {name: "docker", image: 'docker.png', url: "10.0.0.200"},
    {name: "NPM Plus", image: 'npmplus.png', url: "http://10.0.0.201:81"},
    {name: "Dashy", image: 'dashy.png', url: "http://10.0.0.202:4000"},
    {name: "Uptimekuma", image: 'uptimekuma.png', url: "http://10.0.0.203:3001"},
    {name: "Cockpit", image: 'cockpit.png', url: "http://10.0.0.204:9090"},
    {name: "dockge", image: 'dockge.png', url: "http://10.0.0.205:5001"},
    {name: "Tailscale", image: 'tailscale.png', url: "10.0.0.206"},
    {name: "homebridge", image: 'homebridge.png', url: "http://10.0.0.207:8581"},
    {name: "duc", image: 'duc.png', url: "10.0.0.208"},
    {name: "Crafty-Controller", image: 'craftycontroller.png', url: "https://10.0.0.209:8443"},
    {name: "Cosmos", image: 'cosmos.png', url: "http://10.0.0.210:80"},
    {name: "Homer", image: 'homer.png', url: "http://10.0.0.211:8010"},
    {name: "Nginx", image: 'nginx.png', url: "10.0.0.212"},
    {name: "Netbox", image: 'netbox.png', url: "https://10.0.0.213"},
  ]

  VMs: App[] = [
    {name: "Home Assistant", image: 'homeassistant.png', url: "http://10.0.0.240:8123"},
    {name: "Ubuntu Desktop", image: 'ubuntu.png', url: "10.0.0.241"},
    {name: "Ubuntu (Minecraft)", image: 'minecraft.png', url: "10.0.0.242"},
    {name: "Nextcloud", image: 'nextcloud.png', url: "http://10.0.0.243"},
  ]

  getChunks(array: App[], chunkSize: number) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }

    console.log(result);
    return result;

  }

}
