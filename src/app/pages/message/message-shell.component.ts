import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { Location, NgClass } from '@angular/common';
import { SubjectService } from '../../shared/services/subject.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { SubjectComponent } from '../../components/subject/subject/subject.component';
import { SubjectType } from '../../shared/interfaces/subject.interface';
import { MessageSwitchService } from '../../shared/services/message-switch.service';

@Component({
  selector: 'app-message-shell',
  standalone: true,
  imports: [RouterOutlet, ChatComponent, NgClass, BackButtonComponent, SubjectComponent],
  templateUrl: './message-shell.component.html',
  styleUrl: './message-shell.component.scss'
})
export class MessageShellComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private subjectService = inject(SubjectService);
  private messageSwitchService = inject(MessageSwitchService);

  private readonly _subscription: Subscription = new Subscription();
  showMessages: boolean = false;
  subject: SubjectType = {};

  ngOnInit(): void {
    this.navigateToMessages();
    this._subscription.add(
      this.messageSwitchService.messageSwitchSource.subscribe((value) => {
        this.showMessages = value;
      })
    )
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  navigateToMessages(){
    const currentPath = this.location.path();
    if(currentPath == '/provider/message') {
      this.router.navigate(['./clients'], { relativeTo: this.route });
    }
    if(currentPath == '/clients/message') {
      this.router.navigate(['./providers'], { relativeTo: this.route });
    }
  }
}
