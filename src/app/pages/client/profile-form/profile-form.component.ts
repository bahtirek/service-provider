import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ClientProfileService } from './client-profile.service';
import { Client } from '../../../shared/interfaces/client.interface';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../../../shared/form-helpers/form-error/form-error.component';
import { NgFor } from '@angular/common';
import { Success } from '../../../shared/interfaces/success.interface';
import { NumberInputDirective } from '../../../shared/directives/number-input.directive';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormErrorComponent, NgFor, NumberInputDirective],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent {
  private router = inject(Router);
  private clientService = inject(ClientProfileService);

  validate: boolean = false;
  validateConfirmPassword: boolean = false;
  dobErrorMessage: string = '';
  weekdaysErrorMessage: string = '';
  profile?: Client;
  detailsForm: FormGroup;
  regex: string | RegExp = /(19|20)[0-9]{2}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

  constructor(private fb: FormBuilder) {
    this.detailsForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      sex: ['', [Validators.required]],
      dob: ['', [Validators.required, Validators.pattern(this.regex)]],
    });

  }

  ngOnInit() {
    this.setForm();
  };

  setForm() {
    const currentState = this.router.lastSuccessfulNavigation;
    if(!currentState?.extras.replaceUrl) {
      this.profile = currentState?.extras.state!['data'];
      this.firstName?.setValue(this.profile!.firstName);
      this.lastName?.setValue(this.profile!.lastName);
      this.sex?.setValue(this.profile!.sex);
      this.dob?.setValue(this.profile!.dob);
    }
  }

  get firstName() { return this.detailsForm.get('firstName'); }
  get lastName() { return this.detailsForm.get('lastName'); }
  get sex() { return this.detailsForm.get('sex'); }
  get dob() { return this.detailsForm.get('dob'); }

  validateDob(){
    this.dobErrorMessage = '';

    if (!this.dob?.value || this.dob?.value == "") {
      this.dobErrorMessage = 'Field is required';
      return false;
    }

    if (this.dob?.invalid) {
      this.dobErrorMessage = 'Wrong date or date format';
      return false;
    }

    const dob = new Date(this.dob?.value);
    const today = new Date();

    if (dob.setHours(0,0,0,0) > today.setHours(0,0,0,0)) {
      this.dobErrorMessage = 'Wrong date of birth';
      return false
    }
    return true;
  }

  onSubmit() {
    this.validate = true;
    const isDobValid = this.validateDob();
    console.log(isDobValid, this.detailsForm);


    if (isDobValid && this.detailsForm.valid) {
      const form = {
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        sex: this.sex?.value,
        dob: this.dob?.value,
      }

      console.log(form);

      this.clientService.postClientProfileDetails(form).subscribe ({
        next: (response: Success) => {
          if(response && response.success) this.router.navigate(['client'])
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }
  }
}
