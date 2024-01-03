import { Component, SimpleChange, inject } from '@angular/core';
import { ProviderDetailsComponent } from '../../../components/provider-details/provider-details.component';
import { ProviderCardComponent } from '../../../components/provider-card/provider-card.component';
import { ProviderProfileDetails } from '../../../shared/interfaces/provider-profile-detail.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from '../../../shared/services/provider.service';
import { Provider } from '../../../shared/interfaces/provider.interface';
import { MessageService } from '../../../shared/services/message.service';
import { Subject } from '../../../shared/interfaces/subject.interface';
import { ModalComponent } from '../../../components/modal/modal.component';
import { NewSubjectComponent } from './new-subject/new-subject.component';

@Component({
  selector: 'app-my-provider',
  standalone: true,
  imports: [ProviderDetailsComponent, ProviderCardComponent, ModalComponent, NewSubjectComponent],
  templateUrl: './my-provider.component.html',
  styleUrl: './my-provider.component.scss'
})
export class MyProviderComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private providerService = inject(ProviderService);

  showFullDetails = true;
  providerProfileDetails: ProviderProfileDetails = {};
  providerDetails: Provider = {};
  providerId: string | null = null;
  clientProviderId: number | null = null;
  toggleModal: boolean = false;
  subjectDetails: any = {};

  ngOnInit(){
    this.getProviderDetails();
    this.providerDetails = this.providerService.provider;
    console.log(this.providerDetails);

  }

  startSession(){
    this.toggleModal = true;
    const providerId = this.clientProviderId ? null : parseInt(this.providerId!);

    this.subjectDetails = {
      title: "",
      providerId: providerId,
      clientProviderId: this.clientProviderId
    }
  }

  getProviderDetails(){
    this.providerId = this.route.snapshot.paramMap.get('id');
    if(!this.providerId) return;
    this.providerService.getProviderProfileDetailsById(this.providerId).subscribe({
      next: (response) => {
        this.providerProfileDetails = response;
        this.getClientProviderId();
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  getClientProviderId() {
    this.providerService.getMyProviders().subscribe({
      next: (response) => {
        const provider = response.find(item => item.providerId == parseInt(this.providerId!))
        if(provider?.clientProviderId) this.clientProviderId = provider?.clientProviderId;
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  setSubjectId(subjectId: number){
    this.cancel();
    this.router.navigate(['client/messages'])
  }

  cancel() {
    this.toggleModal = false;
  }
}
