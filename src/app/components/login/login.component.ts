import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  error = false;

  auth = inject(AuthService);

  constructor(private readonly router: Router,
              formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      // todo remove for prod
      name: ['WEIX', Validators.required],
      password: ['pw', Validators.required],
    })
  }

  login() {
    return this.auth
      .login(this.loginForm.controls['name'].value, this.loginForm.controls['password'].value)
      .subscribe({
        next: () => this.router.navigateByUrl('/overview'),
        error: () => this.error = true
      });
  }
}
