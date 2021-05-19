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
  @Output() fileDelete = new EventEmitter<any>();

  style: { [key: string]: any } = {};

  constructor() {}

  ngOnInit(): void {
    this.createPreview();
    this.style = {
      width: this.size + 'px',
      height: this.size + 'px',
    };
  }

  delete(): void {
    this.fileDelete.emit(this.index);
  }

  createPreview(): void {
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

  ngOnChanges(changes: SimpleChanges): void {}
}
