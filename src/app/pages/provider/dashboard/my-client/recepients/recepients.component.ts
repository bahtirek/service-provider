import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ClientListComponent } from '../../../../../components/client/client-list/client-list.component';
import { ClientService } from '../../../../../shared/services/client.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Client } from '../../../../../shared/interfaces/client.interface';
import { BackButtonComponent } from '../../../../../components/back-button/back-button.component';

@Component({
  selector: 'app-recepients',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ClientListComponent, BackButtonComponent],
  templateUrl: './recepients.component.html',
  styleUrl: './recepients.component.scss'
})
export class RecepientsComponent {
  private router = inject(Router);
  private clientService = inject(ClientService);
  private readonly _subscription: Subscription = new Subscription();

  clients: Client[] = [];

  ngOnInit(){
    this.getMyClients()
    this._subscription.add(
      this.clientService.updateClientsSource.subscribe(() => {
        this.getMyClients();
      })
    )
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  getMyClients(){
    this.clientService.getMyClients().subscribe({
      next: (response) => {
        console.log(response);
        this.clients = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  cardClicked(client: Client){
    console.log(client);

    this.clientService.saveClientToLocal(client)
    this.router.navigate([`/provider/message/clients/consultations`]);
  }
}
