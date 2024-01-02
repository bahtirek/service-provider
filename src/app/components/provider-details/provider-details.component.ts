import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-provider-details',
  standalone: true,
  imports: [],
  templateUrl: './provider-details.component.html',
  styleUrl: './provider-details.component.scss'
})
export class ProviderDetailsComponent {
  private auth = inject(AuthService);
  showProviderFullDetails = true;

  ngOnInit(){
    this.checkIfClient()
  }
  checkIfClient() {
    if(this.auth.user()?.isClient) {
      /**
       *  get Subjects
       *  if subjects this.showProviderFullDetails = false;
       *
       */
    }
  }
}
