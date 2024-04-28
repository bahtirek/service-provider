import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Client } from '../../../../shared/interfaces/client.interface';
import { Router } from '@angular/router';
import { ClientService } from '../../../../shared/services/client.service';
import { ClientListComponent } from '../../../../components/client/client-list/client-list.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { RecepientsComponent } from './recepients/recepients.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ClientListComponent, RecepientsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

  ngOnInit(){
  }

  ngOnDestroy(): void {
  }
}
