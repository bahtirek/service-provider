import { Route } from '@angular/router';
import { MessageShellComponent } from '../pages/message/message-shell.component';

export const MESSAGES_ROUTES: Route[] = [
  {
    path: '',
    component: MessageShellComponent,
    children: [
      {
        path: 'clients',
        loadComponent: () => import('../pages/provider/dashboard/my-client/recepients/recepients.component').then((c) =>c.RecepientsComponent),
      },
      {
        path: 'clients/consultations',
        loadComponent: () => import('../pages/provider/dashboard/my-client/consultations/consultations.component').then((c) => c.ConsultationsComponent),
      },
    ],
  },
];
