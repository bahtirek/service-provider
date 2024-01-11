import { Component, inject } from '@angular/core';
import { BackButtonComponent } from '../../../components/back-button/back-button.component';
import { SubjectListComponent } from '../../../components/subject-list/subject-list.component';
import { Subject } from '../../../shared/interfaces/subject.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../../../shared/services/subject.service';
import { ProviderService } from '../../../shared/services/provider.service';
import { ClientService } from '../../../shared/services/client.service';

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

  subjectDetails: any = {};
  subjectList: Subject[] = [];
  displayAsCard: boolean = false
  clientId: string | null = null;
  providerClientId: number | null = null;
  ngOnInit(){
    this.getSubjects()
  }


/*   getProviderClientId() {
    this.clientService.getMyClients().subscribe({
      next: (response) => {
        const client = response.find(item => item.clientId == parseInt(this.clientId!))
        if(client?.providerClientId) {
          this.providerClientId = client?.providerClientId;
          this.getSubjects();
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  } */


  getSubjects(){
    const clientId = (this.route.snapshot.paramMap.get('clientId'));
    if(!clientId) return;
    this.subjectService.getClientSubjects(parseInt(clientId)).subscribe({
      next: (response) => {
        this.subjectList = response
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  some = [
    {
        "clientId": 1000,
        "clientUserId": 1000,
        "firstName": "Client",
        "lastName": "Client",
        "email": "client@email.com",
        "newMessage": true
    }
]
}
