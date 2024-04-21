import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../../../shared/form-helpers/form-error/form-error.component';
import { ProviderProfileService } from '../provider-profile.service';
import { WeekDay } from '../../../shared/interfaces/week-day.interface';
import { NgFor} from '@angular/common';
import { WorkHour } from '../../../shared/interfaces/work-hour.interface';
import { Success } from '../../../shared/interfaces/success.interface';
import { ServiceCategory } from '../../../shared/interfaces/service-category.interface';
import { Provider } from '../../../shared/interfaces/provider.interface';

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
  workHoursArray: WorkHour[] = [];
  allCategorys: ServiceCategory[] = [];
  categoryErrorMessage: string = '';
  weekdaysErrorMessage: string = '';
  profile?: Provider;

  constructor(private fb: FormBuilder) {
    this.detailsForm = this.fb.group({
      companyName: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      description: ['', [Validators.required]],
      workHours: this.fb.group({
        fromWorkHourId: ['', Validators.required],
        toWorkHourId: ['', Validators.required]
      }),
      availableDays: this.fb.array([]),
      category: this.fb.array([])
    });

  }

  ngOnInit() {
    this.setForm();
  };

  setForm() {
    const currentState = this.router.lastSuccessfulNavigation;
    if(!currentState?.extras.replaceUrl) {
      this.profile = currentState?.extras.state!['data'];
      this.companyName?.setValue(this.profile!.companyName);
      this.firstName?.setValue(this.profile!.firstName);
      this.lastName?.setValue(this.profile!.lastName);
      this.address?.setValue(this.profile!.address);
      this.phoneNumber?.setValue(this.profile!.phoneNumber);
      this.description?.setValue(this.profile!.description);
    }
    this.getWeekDays();
    this.getWorkHours();
    this.getCategory();
  }

  get companyName() { return this.detailsForm.get('companyName'); }
  get firstName() { return this.detailsForm.get('firstName'); }
  get lastName() { return this.detailsForm.get('lastName'); }
  get address() { return this.detailsForm.get('address'); }
  get phoneNumber() { return this.detailsForm.get('phoneNumber'); }
  get description() { return this.detailsForm.get('description'); }
  get fromWorkHourId() { return this.detailsForm.get('workHours.fromWorkHourId'); }
  get toWorkHourId() { return this.detailsForm.get('workHours.toWorkHourId'); }
  get workHours() { return this.detailsForm.get('workHours'); }
  get availableDays() { return this.detailsForm.get('availableDays') as FormArray; }
  get category() { return this.detailsForm.get('category') as FormArray; }

  setAvailableDays() {
    this.availableDays.clear();
    let weekDayCheck = false
    this.weekDays.forEach(day => {
      if(this.profile) {
        const matchedAvailableDay = this.profile.availableDays?.find(availDayFromProfile => {
          return availDayFromProfile.lkWeekDayId == day.lkWeekDayId
        })
        if(matchedAvailableDay) weekDayCheck = true
      }
      const weekDayControl = this.fb.group ({
        lkWeekDayId: [day.lkWeekDayId],
        weekDayCheck: [weekDayCheck],
      })
      this.availableDays.push(weekDayControl);
      weekDayCheck = false;
    })
  }

  setCategorys() {
    this.category.clear();
    let categoryCheck = false;

    this.allCategorys.forEach(category => {
      if(this.profile) {
        const matchedAvailableDay = this.profile.category?.find(categoryFromProfile => {
          return categoryFromProfile.lkCategoryId == category.lkCategoryId
        })
        if(matchedAvailableDay) categoryCheck = true
      }
      const categoryControl = this.fb.group ({
        lkCategoryId: [category.lkCategoryId],
        categoryCheck: [categoryCheck],
      })
      this.category.push(categoryControl);
      categoryCheck = false;
    })
  }

  getWeekDays() {
    this.providerService.getWeekDays().subscribe({
      next:(response: any) => {
        this.weekDays = response;

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
        this.workHoursArray = response;
        if(this.profile) {
          this.setHours(this.profile);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  setHours(profile: any) {
    const hours = profile?.workHours.split(" - ");
    const from = this.workHoursArray.find(hour => {
      return hour.workHour == hours[0];
    })
    const to = this.workHoursArray.find(hour => {
      return hour.workHour == hours[1];
    })

    this.fromWorkHourId?.setValue(from!.lkWorkHourId)
    this.toWorkHourId?.setValue(to!.lkWorkHourId)
  }

  getCategory() {
    this.providerService.getCategory().subscribe({
      next:(response: any) => {
        this.allCategorys = response;
        this.setCategorys();
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  onSubmit() {
    this.validate = true;
    const isCategoryValid = this.validateCategorys();
    const isWeekdaysValid = this.validateWeekdays();
    this.arrayValidation();
    if (this.detailsForm.valid && isCategoryValid && isWeekdaysValid) {
      const form = {
        companyName: this.companyName?.value,
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        address: this.address?.value,
        phoneNumber: this.phoneNumber?.value,
        description: this.description?.value,
        availableDays: this.filterWeekdays(),
        category: this.filterCategorys(),
        workHours: this.workHours?.value
      }

      this.providerService.postProviderProfileDetails(form).subscribe ({
        next: (response: Success) => {
          if(response && response.success) this.router.navigate(['provider'])
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }
  }

  validateCategorys() {
    if (this.filterCategorys().length > 0) {
      this.categoryErrorMessage = '';
      return true;
    }
    this.categoryErrorMessage = 'Field is required';
    return false;
  }

  validateWeekdays() {
    if (this.filterWeekdays().length > 0) {
      this.weekdaysErrorMessage = '';
      return true;
    }
    this.weekdaysErrorMessage = 'Field is required';
    return false;
  }

  filterWeekdays() {
    return this.availableDays.value.reduce((filtered: number[], day: WeekDay) => {
      if (day.weekDayCheck === true) {
        filtered.push(day.lkWeekDayId)
      }
      return filtered;
    }, []);
  }

  filterCategorys() {
    return this.category.value.reduce((filtered: number[], category: ServiceCategory) => {
      if (category.categoryCheck === true) {
        filtered.push(category.lkCategoryId);
      }
      return filtered;
    }, []);
  }

  arrayValidation() {
    this.detailsForm.controls['category'].valueChanges.subscribe(() => {

      this.validateCategorys()
    })
    this.detailsForm.controls['availableDays'].valueChanges.subscribe(() => {
      this.validateWeekdays()
    })
  }
}
