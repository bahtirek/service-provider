import { Component, SimpleChange, inject } from '@angular/core';
import { ProviderDetailsComponent } from '../../../components/provider-details/provider-details.component';
import { ProviderCardComponent } from '../../../components/provider-card/provider-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from '../../../shared/services/provider.service';
import { Provider } from '../../../shared/interfaces/provider.interface';
import { ModalComponent } from '../../../components/modal/modal.component';
import { NewSubjectComponent } from './new-subject/new-subject.component';
import { SubjectService } from '../../../shared/services/subject.service';
import { Subject } from '../../../shared/interfaces/subject.interface';
import { SubjectListComponent } from '../../../components/subject-list/subject-list.component';
import { BackButtonComponent } from '../../../components/back-button/back-button.component';
import { NavigationService } from '../../../shared/services/navigation.service';

@Component({
  selector: 'app-my-provider',
  standalone: true,
  imports: [ProviderDetailsComponent, ProviderCardComponent, ModalComponent, NewSubjectComponent, SubjectListComponent, BackButtonComponent],
  templateUrl: './my-provider.component.html',
  styleUrl: './my-provider.component.scss'
})
export class MyProviderComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private providerService = inject(ProviderService);
  private subjectService = inject(SubjectService);
  private navigation = inject(NavigationService);

  showFullDetails = true;
  providerProfileDetails: Provider = {};
  providerDetails: Provider = {};
  providerId: string = '';
  toggleModal: boolean = false;
  subjectDetails: any = {};
  subjectList: Subject[] = [];
  displayAsCard: boolean = false

  ngOnInit(){
    this.getProviderDetails();
  }

  createSession(){
    this.toggleModal = true;
    const providerId = parseInt(this.providerId!)

    this.subjectDetails = {
      title: "",
      providerId: providerId
    }
  }

  getProviderDetails(){
    const provider = this.providerService.getProviderFromLocal();
    if(!provider) this.navigation.back();
    this.providerId = provider.providerId;
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
        if(provider?.clientProviderId) {
          this.getSubjects(provider?.clientProviderId);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openSession(subjectId: number){
    this.cancel();
    this.router.navigate([`client/messages/${subjectId}`])
  }

  getSubjects(clientProviderId: number){
    this.subjectService.getProviderSubjects(clientProviderId).subscribe({
      next: (response) => {
        this.subjectList = response
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSubjectClick(subject: Subject){
    this.subjectService.saveSubjectToLocal(subject);
    this.router.navigate(['./messages'], { relativeTo: this.route });
  }

  navigateToDashboard() {
    this.router.navigate(['client/dashboard']);
  }

  cancel() {
    this.toggleModal = false;
  }
}
