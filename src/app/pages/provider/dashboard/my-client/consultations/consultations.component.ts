import { Component, inject } from '@angular/core';
import { SubjectListComponent } from '../../../../../components/subject/subject-list/subject-list.component';
import { BackButtonComponent } from '../../../../../components/back-button/back-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../../../shared/services/client.service';
import { SubjectService } from '../../../../../shared/services/subject.service';
import { NavigationService } from '../../../../../shared/services/navigation.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { SubjectType } from '../../../../../shared/interfaces/subject.interface';
import { Client } from '../../../../../shared/interfaces/client.interface';
import { ClientItemComponent } from '../../../../../components/client/client-item/client-item.component';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [BackButtonComponent, SubjectListComponent, ClientItemComponent],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.scss'
})
export class ConsultationsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private clientService = inject(ClientService);
  private subjectService = inject(SubjectService);
  private navigation = inject(NavigationService);
  private readonly _subscription: Subscription = new Subscription();

  subjectList:SubjectType[] = [];
  displayAsCard: boolean = false
  clientDetails: Client = {}

  ngOnInit(){
    this.getSubjects();
    this._subscription.add(
      this.subjectService.newSubjectsSource.subscribe(() => {
        this.getSubjects();
      })
    )
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  getSubjects(){
    this.clientDetails = this.clientService.getClient();
    if(!this.clientDetails.clientId) this.navigation.back();
    this.subjectService.getClientSubjectsAPI(this.clientDetails.clientId!).subscribe({
      next: (response: SubjectType[]) => {
        this.subjectList = response;
        this.subjectService.subjects = response;
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  onSubjectClick(subject: SubjectType){
    this.subjectService.saveSubjectToLocal(subject);
    this.router.navigate(['./messages'], { relativeTo: this.route });
  }
}
