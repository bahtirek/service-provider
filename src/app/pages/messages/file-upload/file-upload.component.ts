import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  files?: FileList;
  comment: string = "";

  @Input() set filesProp(files: FileList){
    this.files = files
  }

  @Output() cancel = new EventEmitter<boolean>();

  onCancel(){
    this.cancel.emit(true)
  }

  onSend(){

  }
}
