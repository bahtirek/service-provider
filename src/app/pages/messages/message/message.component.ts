import { DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Message } from '../../../shared/interfaces/message.interface';
import { FileDetailsComponent } from '../file-upload/file-details/file-details.component';
import { AttachmentComponent } from './attachment/attachment.component';
import { Attachment } from '../../../shared/interfaces/attachment.interface';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass, DatePipe, AttachmentComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit, AfterViewInit {
  message: Message = {};
  messageType: string = "";
  parent: HTMLDivElement | null = null;

  @Input() userId?: number;
  @Input() receiver?: any;

  @Input() set message$ (value: any) {
    this.message = value;
    this.messageType = this.userId == this.message.createdBy ? 'out' : "in";
  }

  @Output() onMessageIntersect = new EventEmitter<number>();
  @Output() onAttachmentClickEmit = new EventEmitter<Attachment>()

  @ViewChild('messageContent') messageContent!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.isViewdChecker();
  }

  isViewdChecker() {
    if(!this.message.viewed && this.messageType !== 'out' && this.messageContent !== undefined) {
      const threshold = 1;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
                this.onMessageIntersect.emit(this.message.messageId)
                observer.disconnect();
              }
            });
          },
          {
            threshold: 1
          }
        );
        observer.observe(this.messageContent.nativeElement);
    }
  }

  onAttachmentClick(messageAttachment: Attachment){
    this.onAttachmentClickEmit.emit(messageAttachment);
  }
}
