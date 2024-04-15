import { Component, OnInit, inject } from '@angular/core';
import { BackButtonComponent } from '../../../components/back-button/back-button.component';
import { ProviderDetailsComponent } from '../../../components/provider/provider-details/provider-details.component';
import { NavigationService } from '../../../shared/services/navigation.service';
import { ProviderService } from '../../../shared/services/provider.service';
import { Provider } from '../../../shared/interfaces/provider.interface';
import { AuthService } from '../../../shared/services/auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProviderDetailsComponent, BackButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private router = inject(Router);
  private providerService = inject(ProviderService);
  private auth = inject(AuthService);
  providerProfileDetails: Provider = {};

  ngOnInit(): void {
    this.getProviderDetails()
  }

  getProviderDetails(){
    this.providerService.getProviderProfileDetailsById(this.auth.user().user?.userId!).subscribe({
      next: (response) => {
        this.providerProfileDetails = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  edit(){
    const navigationExtras: NavigationExtras = {
      state: {
        data: this.providerProfileDetails
      }
    };
    this.router.navigate(['provider/profile-form'], navigationExtras);
  }
}
