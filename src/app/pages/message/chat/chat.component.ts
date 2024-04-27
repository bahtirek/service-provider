import { Component, ElementRef, OnDestroy, OnInit, ViewChild, WritableSignal, computed, inject } from '@angular/core';
import { MessageToolbarComponent } from '../../messages/message-toolbar/message-toolbar.component';
import { MessageComponent } from '../../messages/message/message.component';
import { BackButtonComponent } from '../../../components/back-button/back-button.component';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { AttachmentModalComponent } from '../../messages/attachment-modal/attachment-modal.component';
import { VideoComponent } from '../../messages/attachment-modal/video/video.component';
import { MessageService } from '../../../shared/services/message.service';
import { SubjectService } from '../../../shared/services/subject.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { ChatService } from '../../../shared/services/chat.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ClientService } from '../../../shared/services/client.service';
import { ProviderService } from '../../../shared/services/provider.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Provider } from '../../../shared/interfaces/provider.interface';
import { Client } from '../../../shared/interfaces/client.interface';
import { Attachment } from '../../../shared/interfaces/attachment.interface';
import { Message } from '../../../shared/interfaces/message.interface';
import { Receiver } from '../../../shared/interfaces/receiver.interface';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { SubjectType } from '../../../shared/interfaces/subject.interface';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MessageToolbarComponent, MessageComponent, BackButtonComponent, DatePipe, NgClass, AttachmentModalComponent, NgStyle, VideoComponent, ChatHeaderComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  private messageService = inject(MessageService);
  private subjectService = inject(SubjectService);
  private navigation = inject(NavigationService);
  private chatService = inject(ChatService);
  private auth = inject(AuthService);
  private clientService = inject(ClientService);
  private providerService = inject(ProviderService);
  private readonly _subscription: Subscription = new Subscription();


  user = this.auth.user();
  messages: WritableSignal<Message[]> = this.messageService.messages;
  chunkNum: number = 1;
  containerBorder: boolean = false;
  receiver: Receiver = {};

  @ViewChild('messageContainer') messageContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('messagesCard') messagesCard!: ElementRef<HTMLDivElement>;
  @ViewChild('downloadLink') downloadLink!: ElementRef<HTMLAnchorElement>;

  subject: any;
  attachmentUrl: string = '';
  toggleImageModal: boolean = false;
  toggleVideoModal: boolean = false;

  ngOnInit(){
    this.getReceiverDeatils();
    this.subject = this.subjectService.getSubjectFromLocal()
    this._subscription.add(
      this.subjectService.subjectsSwitchedSource.subscribe((subject: SubjectType) => {
        this.subject = subject;
      })
    )
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.messagesCard.nativeElement.addEventListener('scroll', () => {
    })
  }

  getMessages():void {
    this.messageService.resetMessages();
    if(this.subject) {
      this.messageService.getMessages(this.subject.subjectId, 1).subscribe({
        next: (response) => {
          this.messageService.addMessages(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  displayDate(index: number, UTC?: string):boolean {
    if(index == this.messages.length - 1) return false;
    return this.getLocalDate(UTC) != this.getLocalDate(this.messages()[index+1]?.createdAt);
  }

  getLocalDate(UTC?: string):string {
    return UTC ? new Date(UTC).toLocaleDateString() : '';
  }

  onMessageIntersect(messageId: number):void {
    const messageDetails = {
      accessToken: this.user?.accessToken,
      messageId: messageId
    }
    this.chatService.sendViewedMessageConfirmation(messageDetails)
  }

  getReceiverDeatils() {
    if(this.auth.user().user?.isClient) {
      const provider: Provider = this.providerService.getProvider();
      if(provider.providerUserId) {
        this.receiver = {
          receiverId: provider.providerUserId,
          firstName: provider.firstName,
          lastName: provider.lastName,
        }
      };
    } else {
      const client: Client = this.clientService.getClient();
      if(client?.clientUserId) {
        this.receiver = {
          receiverId: client.clientUserId,
          firstName: client.firstName,
          lastName: client.lastName,
        }
      };
    }
  }

  onAttachmentClick(messageAttachment: Attachment){
    this.messageService.getAttachmentUrl(messageAttachment.messageAttachmentId!).subscribe({
      next: (response) =>{
        console.log(response);
        this.attachmentUrl = response.attachmentUrl;
        this.processAttachment(messageAttachment);
      },
      error: (error) => {
        console.log(error);

      }
    })
  }
  processAttachment(messageAttachment: Attachment) {
    if(messageAttachment.attachmentMimeType?.includes('video') && !messageAttachment.attachmentMimeType?.includes('avi')){

      this.toggleVideoModal = true;
    } else if(messageAttachment.attachmentThumbnailId == null || messageAttachment.attachmentMimeType?.includes('avi')) {
      this.downloadAttachment(messageAttachment.attachmentOriginalName!);
    } else {
      this.toggleImageModal = true;
    }
  }
  downloadAttachment(name: string) {
    //this.downloadLink.nativeElement.setAttribute('download', name)
    this.downloadLink.nativeElement.href = this.attachmentUrl;
    this.downloadLink.nativeElement.click();
    //window.open(this.attachmentUrl);
  }

  containerHighlight(){
    console.log('hhh');

    //if(this.messages()[0].toUserId == this.auth.user().user?.userId) return;
    this.containerBorder = true;
    setTimeout(() => {
      this.containerBorder = false;
    }, 500)
  }
}
