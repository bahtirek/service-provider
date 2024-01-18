import { Component, Input, Renderer2, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { ChatService } from '../../../shared/services/chat.service';
import { Message } from '../../../shared/interfaces/message.interface';
import { SubjectService } from '../../../shared/services/subject.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-message-toolbar',
  standalone: true,
  imports: [FormsModule, NgClass, ModalComponent, FileUploadComponent],
  templateUrl: './message-toolbar.component.html',
  styleUrl: './message-toolbar.component.scss'
})
export class MessageToolbarComponent {
  private renderer = inject(Renderer2);
  private auth = inject(AuthService);
  private chatService = inject(ChatService);
  private subjectService = inject(SubjectService);


  message: string = "";
  showCursor: boolean = true;
  subjectId: string = '';
  toggleModal: boolean = false;
  files?: FileList;

  @Input() receiverId: string = '';

  @ViewChild('textAreaContainer') textAreaContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('textArea') textArea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  ngOnInit(){
    this.chatService.connect(this.auth.user().accessToken);
    this.getSubjectDetails();
  }
  getSubjectDetails() {
    const subject = this.subjectService.getSubjectFromLocal();
    if(subject) this.subjectId = subject.subjectId;
  }

  onSubmit(){
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
    const ext = /(\.jpg|\.jpeg|\.bmp|\.gif|\.svg|\.png|\.webm|\.avi|\.mpeg|\.mkv|\.doc|\.docx|\.xls|\.xlsx|\.pdf)$/i;
    const files = this.fileUpload.nativeElement.files;
    console.log(files);
    if(files && files.length > 0) {
      this.files = files;
      this.toggleModal = true;
    }
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

  cancel() {
    this.toggleModal = false;
  }
}
