import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../../../shared/form-helpers/form-error/form-error.component';
import { ProviderProfileService } from '../provider-profile.service';
import { WeekDay } from '../../../shared/interfaces/week-day.interface';
import { NgFor } from '@angular/common';
import { WorkHour } from '../../../shared/interfaces/work-hour.interface';
import { ServiceCategory } from '../../../shared/interfaces/service-category.interface';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormErrorComponent, NgFor],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent {
  private router = inject(Router);
  private providerService = inject(ProviderProfileService);

  weekDays: WeekDay[] = [];
  detailsForm: FormGroup;
  validate: boolean = false;
  validateConfirmPassword: boolean = false;
  workHours: WorkHour[] = [];
  categorys: ServiceCategory[] = [];
  errorMessage: string = 'error';

  constructor(private fb: FormBuilder) {
    this.detailsForm = this.fb.group({
      companyName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      description: ['', [Validators.required]],
      availableHours: this.fb.group({
        from: ['', Validators.required],
        to: ['', Validators.required]
      }),
      availableDays: this.fb.array([])
    });
  }

  ngOnInit() {
    this.getWeekDays();
    this.getWorkHours();
  }

  get companyName() { return this.detailsForm.get('companyName'); }
  get address() { return this.detailsForm.get('address'); }
  get phoneNumber() { return this.detailsForm.get('phoneNumber'); }
  get description() { return this.detailsForm.get('description'); }
  get availableDays() { return this.detailsForm.get('availableDays') as FormArray; }
  get from() { return this.detailsForm.get('availableHours.from'); }
  get to() { return this.detailsForm.get('availableHours.to'); }

  setAvailableDays() {
    this.availableDays.clear();
    console.log(this.weekDays);

    this.weekDays.forEach(day => {
      const weekDayControl = this.fb.group ({
        lkWeekDayId: [day.lkWeekDayId],
        weekDay: [false, [Validators.required]],
      })
      this.availableDays.push(weekDayControl);
    })
  }





  onSubmit() {
    this.validate = true;
    console.log(this.detailsForm.value);

    if (this.detailsForm.valid) {


      /* this.auth.registration(user).subscribe ({
        next: (user) => {
          this.registrationIsOn = false;
        },
        error: (error: any) => {
          console.log(error);
        }
      }) */
    }
  }

  getWeekDays() {
    this.providerService.getWeekDays().subscribe({
      next:(response: any) => {
        console.log(response);
        this.weekDays = response;
        console.log(this.weekDays);

        this.setAvailableDays()
      },
      error: (error: any) => {
        console.log(error);

      }
    })
  }
  getWorkHours() {
    this.providerService.getWorkHours().subscribe({
      next:(response: any) => {
        console.log(response);
        this.workHours = response;
        console.log(this.workHours);
      },
      error: (error: any) => {
        console.log(error);

      }
    })
  }
  getCategory() {
    this.providerService.getCategory().subscribe({
      next:(response: any) => {
        console.log(response);
        this.categorys = response;
        console.log(this.categorys);
      },
      error: (error: any) => {
        console.log(error);

      }
    })
  }
}
