import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { popAnim } from 'src/app/animations/animations';

@Component({
  selector: 'pictures-preview',
  templateUrl: './pictures-preview.component.html',
  styleUrls: ['./pictures-preview.component.scss'],
  animations: [popAnim],
})
export class PicturesPreviewComponent implements OnInit {
  @Input() picture: any;
  @Input() index: number = 0;
  @Input() size: number = 0;
  @Input() crossButton: boolean = true;
  @Input() checkBox: boolean = false;
  @Input() pictureType: string = 'blob';
  @Input() isLoading: boolean = false
  @Output() fileDelete = new EventEmitter<any>();
  @Output() checkedValue = new EventEmitter<{
    picture: string;
    checked: boolean;
  }>();

  style: { [key: string]: any } = {};

  constructor() { }

  ngOnInit(): void {
    this.style = {
      width: this.size + 'px',
      height: this.size + 'px',
    };
    this.createPreview();
  }

  delete(): void {
    this.fileDelete.emit(this.index);
  }

  createPreview(): void {
    if (this.pictureType === 'blob') this.createBlobPreview();
    if (this.pictureType === 'path') this.createPathPreview();
  }

  sendCheck(checked: boolean): void {
    this.checkedValue.emit({ picture: this.picture, checked: checked });
  }

  createBlobPreview(): void {
    const preview = new FileReader();
    preview.onload = (event) => {
      if (event.target) {
        this.style = {
          ...this.style,
          backgroundImage: `url('${event.target.result}')`,
        };
      }
    };
    preview.readAsDataURL(this.picture);
  }

  createPathPreview(): void {
    this.style = {
      ...this.style,
      backgroundImage: `url('${this.picture}')`,
    };
  }
}
