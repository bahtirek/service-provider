import { Component, Input, OnInit, Renderer2, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { ChatService } from '../../../shared/services/chat.service';
import { Message } from '../../../shared/interfaces/message.interface';
import { SubjectService } from '../../../shared/services/subject.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'app-message-toolbar',
  standalone: true,
  imports: [FormsModule, NgClass, ModalComponent, FileUploadComponent],
  templateUrl: './message-toolbar.component.html',
  styleUrl: './message-toolbar.component.scss'
})
export class MessageToolbarComponent implements OnInit {
  private renderer = inject(Renderer2);
  private auth = inject(AuthService);
  private chatService = inject(ChatService)
  private subjectService = inject(SubjectService);
  private messageService = inject(MessageService)


  message: string = "";
  showCursor: boolean = true;
  subjectId?: number;
  toggleModal: boolean = false;
  files?: FileList;
  uploadInprogress = signal<number>(0)

  @Input() receiverId: string = '';

  @ViewChild('textAreaContainer') textAreaContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('textArea') textArea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  ngOnInit(){
    this.getSubjectDetails();
  }
  getSubjectDetails() {
    const subject = this.subjectService.getSubjectFromLocal();
    if(subject) {
      this.subjectId = subject.subjectId;
      this.chatService.setSubjectId(this.subjectId!);
    }
  }

  onSubmit(){
    if(!this.subjectId || !this.receiverId) return;
    const newMessage = this.textAreaContainer.nativeElement.dataset['replicatedValue']?.trim();
    if (!newMessage) return;
    const messageDetails: Message = {
      subjectId: this.subjectId,
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

  onFileUpload(comment: string){
    if(!this.files || this.files.length == 0) return;
    let files: FormData = new FormData();
    [...this.files].forEach(file => {
      files.append('files', file)
    });

    const messageDetails: any = {
      subjectId: this.subjectId,
      message: comment,
      accessToken: this.auth.user().accessToken,
      toUserId: this.receiverId,
      isAttachment: true,
    };

    files.append('message', JSON.stringify(messageDetails))

    this.messageService.uploadFile(files).subscribe({
      next: (response) => {
        if(response.messageId){
          this.messageService.addMessage(response)
        }
        this.cancel();
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  MB20: number = 1024 * 1024 * 20;
  MB80: number = 1024 * 1024 * 80;
  MB100: number = 1024 * 1024 * 100;

  onFileUploads(comment: string) {
    this.cancel();
    let formDataArray: any = [];
    let currentIndex: number = 0;
    let currentSize = 0;
    if(!this.files || this.files.length == 0) return;
    let files: FormData = new FormData();
    [...this.files].forEach(file => {
      if(file.size < this.MB20 && currentSize < this.MB20) {
        files.append('files', file);
        formDataArray[currentIndex] = files;
        currentSize = currentSize + file.size
        if(currentSize > this.MB20) {
          currentIndex = formDataArray.length;
          currentSize = 0;
        }
      } else {
        let bigFile: FormData = new FormData();
        bigFile.append('files', file);
        formDataArray[formDataArray.length] = bigFile;
      }
    });
    this.submitAttachmentMessage(formDataArray, comment)

  }

  submitAttachmentMessage(formDataArray: any, comment: string) {
    const messageDetails: any = {
      subjectId: this.subjectId,
      message: comment,
      accessToken: this.auth.user().accessToken,
      toUserId: this.receiverId,
      isAttachment: true,
    };

    this.messageService.postAttachmentMessage(messageDetails).subscribe({
      next: (response: Message) => {
        console.log(response);
        response.totalUploads = formDataArray.length;
        this.messageService.addMessage(response)
        if(response.messageId) this.submitFiles(formDataArray, response.messageId)
      },
      error: (error) => {
        console.log();
      }
    })
  }

  submitFiles(formDataArray: any, messageId: number) {
    formDataArray.forEach((formData: any) => {
      console.log(formData);
      formData.append('messageId', messageId)
      console.log(formData);

      this.messageService.uploadFile(formData).subscribe({
        next: (response) => {
          this.messageService.updateMessage(response)
        },
        error: (err) => {
          console.log(err);
        },
      })
    });
  }

  onFocus(){
    this.showCursor = false;
  }

  cancel() {
    this.toggleModal = false;
  }
}
