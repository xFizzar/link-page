import {Component, inject, signal} from '@angular/core';
import {
  AbstractControl, AsyncValidatorFn,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {HttpService} from '../../services/http.service';
import {CreateApp} from '../objects/interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-app',
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  templateUrl: './create-app.component.html',
  styleUrl: './create-app.component.css'
})
export class CreateAppComponent {


  http = inject(HttpService)
  formBuilder = inject(FormBuilder).nonNullable;
  router = inject(Router);

  types: string[] = ["LXC", "HOST", "VM"];

  createAppForm = this.formBuilder.group({
      "name": ["", Validators.required],
      "url": ["", Validators.required],
      "imageURL": ["", [Validators.required], this.validImageValidator()],
      "type": [this.types.at(0)!, Validators.required]
    },
  )

  validImage = signal<boolean>(false);
  showError = signal<boolean>(false);


  onSubmit() {
    let toSave: CreateApp = {
      name: this.createAppForm.controls.name.value,
      url: this.createAppForm.controls.url.value,
      imageURL: this.createAppForm.controls.imageURL.value,
      type: this.createAppForm.controls.type.value,
    }

    this.http.createApp(toSave).subscribe({
        next: _ => this.router.navigate(["/overview"]),
        error: _ => this.showError.set(true)
      }
    )
  }


  constructor() {
    this.createAppForm.controls.imageURL.valueChanges.subscribe(value => {
      this.checkIfImage(value).then(value1 => {
        this.validImage.set(value1)
      })
    })
  }

  checkIfImage(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = function () {
        resolve(true);
      };

      img.onerror = function () {
        resolve(false);
      };

      img.src = url + "/download";
    });
  }

  validImageValidator(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      const imageURL = control.value
      const value = await this.checkIfImage(imageURL);
      return !value ? {"invalid_image": imageURL} : null;
    };
  }
}
