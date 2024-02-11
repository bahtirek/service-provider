import { DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject} from '@angular/core';
import { Message } from '../../../shared/interfaces/message.interface';
import { FileDetailsComponent } from '../file-upload/file-details/file-details.component';
import { AttachmentComponent } from './attachment/attachment.component';
import { Attachment } from '../../../shared/interfaces/attachment.interface';
import { FloatMenuComponent } from '../../../components/float-menu/float-menu.component';
import { FloatMenu } from '../../../shared/interfaces/float-menu.interface';
import { FloatMenuHorizontalComponent } from '../../../components/float-menu-horizontal/float-menu-horizontal.component';
import { ReplyService } from '../../../shared/services/reply.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass, DatePipe, AttachmentComponent, FloatMenuHorizontalComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit, AfterViewInit {
  private replyService = inject(ReplyService);
  message: Message = {};
  messageType: string = "";
  parent: HTMLDivElement | null = null;
  menuItems: FloatMenu[] = [
    {
      label: "Edit",
      action: "edit",
      icon: "edit"
    },
    {
      label: "Reply",
      action: "reply",
      icon: "reply"
    },
    {
      label: "Delete",
      action: "delete",
      icon: "delete",
    },
  ]

  @Input() userId?: number;
  @Input() receiver?: any;
  @Input() index?: number;

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
    if(this.index == 0 && this.messageType == 'out') {
      this.messageContent.nativeElement.scrollIntoView();
    }
  }

  isViewdChecker() {
    console.log(!this.message.viewed && this.messageType !== 'out' && this.messageContent !== undefined);

    if(!this.message.viewed && this.messageType !== 'out' && this.messageContent !== undefined) {
      const threshold = 1;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log(this.message.messageId);

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
    if(!this.message.viewed) {
      //check if in viewport
    }
  }

  onAttachmentClick(messageAttachment: Attachment){
    this.onAttachmentClickEmit.emit(messageAttachment);
  }

  menuActionHandle(action: string) {
    if(action == "reply") {
      this.replyService.replyToMessage(this.message)
    }
  }
}
