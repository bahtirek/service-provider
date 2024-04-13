import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Client } from '../../../shared/interfaces/client.interface';
import { Router } from '@angular/router';
import { ClientService } from '../../../shared/services/client.service';
import { ClientListComponent } from '../../../components/client/client-list/client-list.component';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ClientListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
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
    this.clientService.saveClientToLocal(client)
    this.router.navigate([`/provider/my-client`]);
  }
}
