import { Component, Input, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { opacityAnim } from 'src/app/animations/animations';
import { CropModalService } from './crop-modal.service';

@Component({
  selector: 'crop-modal',
  templateUrl: './crop-modal.component.html',
  styleUrls: ['./crop-modal.component.scss'],
  animations: [opacityAnim],
})
export class CropModalComponent implements OnInit {
  constructor(private cropModal: CropModalService) {}
  @Input() closeOnClick: boolean = false;
  @Input() opacity: number = 0.3;

  style: { [key: string]: any } = {};
  isDisplayed: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  ngOnInit(): void {
    this.cropModal.isDisplayed$.subscribe((state) => {
      this.isDisplayed = state;
    });

    this.style = {
      'background-color': `rgba(0, 0, 0, ${this.opacity})`,
    };
  }

  ngOnDestroy(): void {
    this.cropModal.isDisplayed$.unsubscribe();
  }

  closeModal(): void {
    if (!this.closeOnClick) return;
    this.cropModal.switch();
  }
}
