import { Component, Input, inject } from '@angular/core';
import { BackButtonComponent } from '../../../../components/back-button/back-button.component';
import { SubjectListComponent } from '../../../../components/subject-list/subject-list.component';
import { Subject } from '../../../../shared/interfaces/subject.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../../../../shared/services/subject.service';
import { ProviderService } from '../../../../shared/services/provider.service';
import { ClientService } from '../../../../shared/services/client.service';
import { Client } from '../../../../shared/interfaces/client.interface';
import { NavigationService } from '../../../../shared/services/navigation.service';

@Component({
  selector: 'app-my-client',
  standalone: true,
  imports: [BackButtonComponent, SubjectListComponent],
  templateUrl: './my-client.component.html',
  styleUrl: './my-client.component.scss'
})
export class MyClientComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private clientService = inject(ClientService);
  private subjectService = inject(SubjectService);
  private navigation = inject(NavigationService);

  subjectList: Subject[] = [];
  displayAsCard: boolean = false
  clientDetails: Client = {}

  ngOnInit(){
    this.getSubjects()
  }

  getSubjects(){
    this.clientDetails = this.clientService.getClientFromLocal();
    if(!this.clientDetails.clientId) this.navigation.back();
    this.subjectService.getClientSubjects(this.clientDetails.clientId!).subscribe({
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
    console.log(subject);

    this.router.navigate(['./messages'], { relativeTo: this.route });
  }
}
