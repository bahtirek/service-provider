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
  thumbnail?: string;

  @Input() set fileProp(file: File){
    this.file = file;
    this.setFileType(file.type);
    console.log(this.file);
    if(this.fileType != 'IMG') return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if(e.target) this.fileUrl = `url("${e.target.result}")`
    }

    reader.readAsDataURL(file);
  }

  async setFileType(type: string) {
    console.log(this.file);
    console.log(type.includes('video') || type.includes('avi'));
    console.log(type);


    if(type.includes('image')) {
      this.fileType =  'IMG'
    } else if (type.includes('pdf')) {
      this.fileType =  'PDF'
    } else if (type.includes('zip')) {
      this.fileType =  'ZIP'
    } else if (type.includes('document')) {
      this.fileType =  'DOC'
    } else if (type.includes('video')) {
      if(type.includes('mp4') || type.includes('ogg') || type.includes('mov') || type.includes('webm')) {
        const thumbnail =  await this.generateVideoThumbnail(this.file!);
        this.fileUrl = `url("${thumbnail}")`;
      }
      this.fileType =  'VID'
    } else {
      this.fileType =  'UNK'
    }
  }


  generateVideoThumbnail(file: File):Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const video = document.createElement("video");

      // this is important
      video.autoplay = true;
      video.muted = true;
      video.src = URL.createObjectURL(file);

      video.onloadeddata = () => {
        let ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        if(ctx == null) return null;
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.pause();
        return resolve(canvas.toDataURL("image/png"));
      };
    });
  };
}
