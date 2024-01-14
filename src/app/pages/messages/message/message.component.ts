import { DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Message } from '../../../shared/interfaces/message.interface';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit, AfterViewInit {
  message: Message = {};
  messageType: string = "";
  parent: HTMLDivElement | null = null;

  @Input() userId?: number;
  @Input() messageContainerRect?: DOMRect;

  @Input() set message$ (value: any) {
    this.message = value;
    this.messageType = this.userId == this.message.createdBy ? 'out' : "in";
  }

  @Output() onMessageIntersect = new EventEmitter<number>();

  @ViewChild('messageContent') messageContent!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log('viewinit');
    this.isViewdChecker();
  }

  isViewdChecker() {
    console.log('res',this.message.viewed)
    console.log('res',this.messageType)
    console.log('res',this.messageContent)
    if(!this.message.viewed && this.messageType !== 'out' && this.messageContent !== undefined) {
      if(this.isElInViewport()) return;
      const threshold = 1; // how much % of the element is in view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log(this.message);

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

  isElInViewport() {

    const elRect = this.messageContent.nativeElement.getBoundingClientRect();
    console.log(elRect, this.messageContainerRect);
    console.log(elRect.top , this.messageContainerRect!.top , elRect.bottom ,this.messageContainerRect!.bottom);
    console.log(elRect.top >= this.messageContainerRect!.top && elRect.bottom <= this.messageContainerRect!.bottom);
    if ((elRect.top >= this.messageContainerRect!.top) && (elRect.bottom <= this.messageContainerRect!.bottom)) {
      this.onMessageIntersect.emit(this.message.messageId);
      return true;
    } else {
      return false;
    }
  }
}
