import { Component, Renderer2, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { MessageService } from '../../../shared/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { ChatService } from '../../../shared/services/chat.service';

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

  message: string = "";
  showCursor: boolean = true;
  subjectId: string | null = null;

  @ViewChild('textAreaContainer') textAreaContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('textArea') textArea!: ElementRef<HTMLTextAreaElement>;

  ngOnInit(){
    this.chatService.connect(this.auth.user().accessToken)
  }

  onSubmit(){
    this.subjectId = this.route.snapshot.paramMap.get('subjectId');
    const providerId = this.route.snapshot.paramMap.get('providerId');
    if(!this.subjectId) return;
    const newMessage = this.textAreaContainer.nativeElement.dataset['replicatedValue']?.trim();
    if (!newMessage) return;
    const messageDetails = {
      subjectId: parseInt(this.subjectId),
      message: newMessage,
      accessToken: this.auth.user().accessToken,
      toUserId: providerId
    };

    this.chatService.sendMessage(messageDetails);
    /* this.messageService.postMessage(messageDetails).subscribe({
      next: (response) => {
        if(!response?.messageId) return;
        this.messageService.addMessage({
          messageId: response.messageId,
          message: newMessage,
          createdBy: this.auth.user()?.user?.userId,
          viewed: false
        })
        this.resetMessageInputField()
      },
      error: (error) => {
        console.log(error);
      }
    }) */
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
