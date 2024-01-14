import { DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, TrackByFunction, ViewChild} from '@angular/core';
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
    this.isViewdChecker();
  }

  isViewdChecker() {
    if(!this.message.viewed && this.messageType !== 'out' && this.messageContent !== undefined) {
      //if(this.isElInViewport()) return;
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

  isElInViewport() {
    const elRect = this.messageContent.nativeElement.getBoundingClientRect();
    if ((elRect.top >= this.messageContainerRect!.top) && (elRect.bottom <= this.messageContainerRect!.bottom)) {
      this.onMessageIntersect.emit(this.message.messageId);
      return true;
    } else {
      return false;
    }
  }
}
