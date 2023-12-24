import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormErrorComponent } from '../../shared/form-helpers/form-error/form-error.component';
import { emailValidator } from '../../shared/form-helpers/validators/email.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  validate: boolean = true;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required]],
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    this.validate = true;
    if (this.loginForm.valid) {
      console.log('Registration successful!', this.loginForm);
      // You can add logic here to send the registration data to your server
    } else {
      console.log('Please fill out all required fields');
    }
  }
}
