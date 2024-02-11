import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../../../../shared/interfaces/message.interface';
import { NgStyle } from '@angular/common';
import { Attachment } from '../../../../shared/interfaces/attachment.interface';

@Component({
  selector: 'app-reply-to-message-details',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './reply-to-message-details.component.html',
  styleUrl: './reply-to-message-details.component.scss'
})
export class ReplyToMessageDetailsComponent {
  message: Message = {};
  attachment?: Attachment;
  attachmentUrl: string = '';
  attachmentType: string = 'UNK'

  @Input() set messageProp (message: Message) {
    this.reset();
    this.message = message;
    this.setAttachment();
  };

  @Output() cancelEmit = new EventEmitter<void>();

  setAttachment(){
    if(this.message.attachments!.length == 0) return;
    this.attachment = this.message.attachments![0];
    if(this.attachment.thumbnailUrl == null) {
      this.attachmentType = this.setAttachmentType(this.attachment.attachmentMimeType!)
    } else {
      this.attachmentUrl = `url("${this.attachment.thumbnailUrl}")`
    }
  }

  setAttachmentType(type: string) {
    if(type.includes('image')) {
      return 'IMG'
    } else if (type.includes('video')) {
      return 'VID'
    } else if (type.includes('pdf')) {
      return 'PDF'
    } else if (type.includes('zip')) {
      return 'ZIP'
    } else if (type.includes('document')) {
      return 'DOC'
    } else {
      return 'UNK'
    }
  }

  cancel(){
    this.reset();
    this.cancelEmit.next();
  }

  reset(){
    this.message = {};
    this.attachment = {};
    this.attachmentUrl = '';
  }

}
