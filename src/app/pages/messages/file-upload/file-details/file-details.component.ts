import { Component, Input } from '@angular/core';
import { FileSizePipe } from '../../../../shared/pipes/file-size.pipe';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-file-details',
  standalone: true,
  imports: [FileSizePipe, NgStyle],
  templateUrl: './file-details.component.html',
  styleUrl: './file-details.component.scss'
})
export class FileDetailsComponent {
  file?: File;
  fileUrl: string | ArrayBuffer | null = '';
  fileType: string = 'UNK'

  @Input() set fileProp(file: File){
    this.fileType = this.setFileType(file.type);
    console.log(this.fileType);
    this.file = file;
    if(this.fileType != 'IMG') return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if(e.target) this.fileUrl = `url("${e.target.result}")`
    }

    reader.readAsDataURL(file);
  }

  setFileType(type: string) {
    if(type.includes('image')) {
      return 'IMG'
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
