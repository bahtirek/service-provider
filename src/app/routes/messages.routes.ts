import { Route } from '@angular/router';
import { MessageShellComponent } from '../pages/message/message-shell.component';

export const MESSAGES_ROUTES: Route[] = [
  {
    path: '',
    component: MessageShellComponent,
    children: [
      {
        path: 'recipients',
        loadComponent: () => import('../pages/message/recepients/recepients.component').then((c) =>c.RecepientsComponent),
        /* outlet: 'left' */
      },
      {
        path: 'consultations',
        loadComponent: () => import('../pages/message/consultations/consultations.component').then((c) => c.ConsultationsComponent),
        /* outlet: 'left' */
      },
      {
        path: 'consultations/chat',
        loadComponent: () => import('../pages/message/chat/chat.component').then((c) => c.ChatComponent),
        outlet: 'right'
      },
      {
        path: '',
        redirectTo: 'recipients',
        pathMatch: 'full',
      },
    ],
  },
];
