import { Component, Input, SimpleChange, inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Provider } from '../../../shared/interfaces/provider.interface';

@Component({
  selector: 'app-provider-details',
  standalone: true,
  imports: [],
  templateUrl: './provider-details.component.html',
  styleUrl: './provider-details.component.scss'
})
export class ProviderDetailsComponent {
  private auth = inject(AuthService);
  providerDetails: Provider = {};
  providerProfileDetails: Provider = {};

  @Input() set provider (value: Provider) {
    this.providerDetails = value;
    console.log(this.providerDetails);

  }

  @Input() set providerProfile (value: Provider) {
    this.providerProfileDetails = value;
  }

  ngOnInit(){
    this.checkIfClient()
  }

  ngOnChanges(changes: SimpleChange){
    console.log(changes);
    console.log(this.providerProfileDetails);


  }

  checkIfClient() {
    if(this.auth.user()?.user?.isClient) {
      /**
       *  get Subjects
       *  if subjects this.showProviderFullDetails = false;
       *
       */
    }
  }

  cardClicked() {

  }
}
