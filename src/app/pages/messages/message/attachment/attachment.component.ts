import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Attachment } from '../../../../shared/interfaces/attachment.interface';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-attachment',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './attachment.component.html',
  styleUrl: './attachment.component.scss'
})
export class AttachmentComponent {
  file?: Attachment;
  fileUrl: string = '';
  fileType: string = 'UNK'

  @Input() set fileProp(file: Attachment){
    if(file.thumbnailUrl == null) this.fileType = this.setFileType(file.attachmentMimeType!);
    //console.log(this.fileType);
    this.file = file;
    //if(this.fileType != 'IMG') return;
    this.fileUrl = `url("${file.thumbnailUrl}")`
    //console.log(file);

  }

  @Output() onAttachmentClickEmit = new EventEmitter<Attachment>();

  onAttachmentClick(){
    this.onAttachmentClickEmit.emit(this.file);
  }

  setFileType(type: string) {
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
}
