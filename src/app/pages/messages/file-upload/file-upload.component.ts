import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { FileDetailsComponent } from './file-details/file-details.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [FormsModule, FileDetailsComponent],
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
  @Output() onFileUpload = new EventEmitter<string>();

  onCancel(){
    this.cancel.emit(true)
  }

  onSend(){
    this.onFileUpload.emit(this.comment.trim())
  }
}
