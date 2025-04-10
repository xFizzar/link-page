import {Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {App} from '../objects/interfaces';

@Component({
  selector: 'app-app',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  app = input.required<App>();

}
