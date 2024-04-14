import { Component, inject } from '@angular/core';
import { BackButtonComponent } from '../../../components/back-button/back-button.component';
import { ClientDetailsComponent } from '../../../components/client/client-details/client-details.component';
import { Client } from '../../../shared/interfaces/client.interface';
import { NavigationService } from '../../../shared/services/navigation.service';
import { ClientService } from '../../../shared/services/client.service';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ClientDetailsComponent, BackButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private navigation = inject(NavigationService);
  private clientService = inject(ClientService);
  private auth = inject(AuthService);
  clientProfileDetails: User = {};

  ngOnInit(): void {
    this.clientProfileDetails = this.auth.user().user!
  }


  edit(){
    console.log('edit');

  }
}
