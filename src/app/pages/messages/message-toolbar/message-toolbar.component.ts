import { Component, Input, Renderer2, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { MessageService } from '../../../shared/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { ChatService } from '../../../shared/services/chat.service';
import { Message } from '../../../shared/interfaces/message.interface';
import { NavigationService } from '../../../shared/services/navigation.service';
import { ProviderService } from '../../../shared/services/provider.service';
import { SubjectService } from '../../../shared/services/subject.service';
import { ClientService } from '../../../shared/services/client.service';
import { Client } from '../../../shared/interfaces/client.interface';
import { Provider } from '../../../shared/interfaces/provider.interface';

@Component({
  selector: 'app-message-toolbar',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './message-toolbar.component.html',
  styleUrl: './message-toolbar.component.scss'
})
export class MessageToolbarComponent {
  private renderer = inject(Renderer2);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private chatService = inject(ChatService);
  private navigation = inject(NavigationService);
  private clientService = inject(ClientService);
  private subjectService = inject(SubjectService);
  private providerService = inject(ProviderService);


  message: string = "";
  showCursor: boolean = true;
  subjectId: string = '';
  receiverId: string = '';

  @ViewChild('textAreaContainer') textAreaContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('textArea') textArea!: ElementRef<HTMLTextAreaElement>;

  ngOnInit(){
    this.chatService.connect(this.auth.user().accessToken);
    this.getSubjectDetails();
    this.getReceiverDeatils();
  }
  getSubjectDetails() {
    const subject = this.subjectService.getSubjectFromLocal();
    if(subject) this.subjectId = subject.subjectId;
  }

  getReceiverDeatils() {
    if(this.auth.user().user?.isClient) {
      const provider: Provider = this.providerService.getProviderFromLocal();
      if(provider.providerUserId) this.receiverId = provider.providerUserId.toString();
    } else {
      const client: Client = this.clientService.getClientFromLocal();
      if(client?.clientUserId) this.receiverId = client?.clientUserId.toString()
    }
  }

  onSubmit(){
    //if(!this.subjectId || !this.receiverId) this.navigation.back();
    if(!this.subjectId || !this.receiverId) return;
    const newMessage = this.textAreaContainer.nativeElement.dataset['replicatedValue']?.trim();
    if (!newMessage) return;
    const messageDetails: Message = {
      subjectId: parseInt(this.subjectId),
      message: newMessage,
      accessToken: this.auth.user().accessToken,
      toUserId: this.receiverId,
    };

    this.chatService.sendMessage(messageDetails);
    this.resetMessageInputField();
  }

  resetMessageInputField() {
    this.renderer.setAttribute(this.textAreaContainer.nativeElement, 'data-replicated-value',  "")
    this.textArea.nativeElement.value = "";
    this.showCursor = true;
  }

  onAttach(){

  }

  onBlur(){
    if (this.textArea.nativeElement.value) {
      this.showCursor = false;
    } else {
      this.showCursor = true;
    }
  }

  onFocus(){
    this.showCursor = false;
  }
}
