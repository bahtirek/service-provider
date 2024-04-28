import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
import { MessageService } from '../../../../../shared/services/message.service';
import { MessageSwitchService } from '../../../../../shared/services/message-switch.service';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [BackButtonComponent, SubjectListComponent, ClientItemComponent],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.scss'
})
export class ConsultationsComponent implements OnInit, OnDestroy {
  private clientService = inject(ClientService);
  private subjectService = inject(SubjectService);
  private navigation = inject(NavigationService);
  private readonly _subscription: Subscription = new Subscription();
  private messageService = inject(MessageService);
  private messageSwitchService = inject(MessageSwitchService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  subject: SubjectType = {};
  subjectList:SubjectType[] = [];
  displayAsCard: boolean = false
  clientDetails: Client = {}
  isMessageClassOn: boolean = false;

  ngOnInit(){
    this.getSubjects();
    this._subscription.add(
      this.subjectService.newSubjectsSource.subscribe(() => {
        this.getSubjects();
      })
    )
    this._subscription.add(
      this.messageSwitchService.messageSwitchSource.subscribe((value) => {
        this.isMessageClassOn = value
      })
    )
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this.messageService.resetMessages();
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

  getMessages(subject: SubjectType):void {
    this.messageService.resetMessages();
    this.messageService.getMessages(subject.subjectId!, 1).subscribe({
      next: (response) => {
        this.messageService.addMessages(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSubjectClick(subject: SubjectType){
    if(this.isMessageClassOn && this.subject.subjectId && this.subject.subjectId == subject.subjectId) return;
    this.subject = subject;
    this.getMessages(subject);
    this.subjectService.saveSubjectToLocal(subject);
    this.messageSwitchService.messageSwitchSource.next(true);
    this.router.navigate(['./chat'], { relativeTo: this.route });
  }
}
