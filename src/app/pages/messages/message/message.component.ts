import { DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject} from '@angular/core';
import { Message } from '../../../shared/interfaces/message.interface';
import { AttachmentComponent } from './attachment/attachment.component';
import { Attachment } from '../../../shared/interfaces/attachment.interface';
import { FloatMenu } from '../../../shared/interfaces/float-menu.interface';
import { FloatMenuHorizontalComponent } from '../../../components/float-menu-horizontal/float-menu-horizontal.component';
import { ReplyService } from '../../../shared/services/reply.service';
import { Receiver } from '../../../shared/interfaces/receiver.interface';
import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass, DatePipe, AttachmentComponent, FloatMenuHorizontalComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit, AfterViewInit {
  private replyService = inject(ReplyService);
  private messageService = inject(MessageService);

  message: Message = {};
  messageType: string = "";
  parent: HTMLDivElement | null = null;
  highlight: string = '';
  menuItems: FloatMenu[] = [];
  menuItemsIn: FloatMenu[] = [
    {
      label: "Reply",
      action: "reply",
      icon: "reply"
    },
  ];
  menuItemsOut: FloatMenu[] = [
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
  ];

  @Input() userId?: number;
  @Input() receiver?: Receiver;
  @Input() index?: number;
  @Input() set scrollIntoViewProp (value: boolean | undefined) {
    if(value) {
      this.messageContent.nativeElement.scrollIntoView({
        block: "center", // Start, center, end, or nearest. Defaults to start.
        behavior: "smooth"
      });
      this.highlight = 'highlight-message';
    } else {
      this.highlight = ''
    }
  }

  @Input() set message$ (value: any) {
    this.message = value;
    if(this.userId == this.message.createdBy){
      this.messageType = 'out';
      this.menuItems = this.menuItemsOut;
    } else {
      this.messageType = 'in';
      this.menuItems = this.menuItemsIn;
    }
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
    if(!this.message.viewed) {
      //check if in viewport
    }
  }

  onAttachmentClick(messageAttachment: Attachment){
    this.onAttachmentClickEmit.emit(messageAttachment);
  }

  menuActionHandle(action: string) {
    if(action == "reply") {
      this.message.receiver = this.receiver;
      this.replyService.replyToMessage(this.message);
    }
  }

  goToMessage() {
    this.messageService.updateMessageScrollIntoViewProperty(this.message.replyToMessage?.replyToMessageId!)
  }
}
