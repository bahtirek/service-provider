import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormErrorComponent } from '../../shared/form-helpers/form-error/form-error.component';
import { emailValidator } from '../../shared/form-helpers/validators/email.validator';
import { Credentials } from '../../shared/interfaces/credentials.interface';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = inject(Router);
  loginForm: FormGroup;
  validate: boolean = true;
  private auth = inject(AuthService);
  errorMessage: string = "";

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
      const credentials: Credentials = {
        email: this.email?.value,
        password: this.password?.value
      }
      this.auth.login(credentials).subscribe ({
        next: (user) => {
          this.auth.setUser(user);
          //check if client
          this.router.navigate(['provider']);
        },
        error: (error: any) => {
          console.log(error);
          if(error.status === 401) {
            this.errorMessage = 'Invalid credentials';
          }
        }
      })
    }
  }
}
