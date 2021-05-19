import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { filter } from 'rxjs/operators';
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

  style: { [key: string]: any } = {};
  isDisplayed: boolean = false;
  props: { [key: string]: any } = {};
  picturesPreview: any[] = [];

  imageFile: any = '';
  croppedImage: any = '';

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
    this.getInfos();
    this.cropModal.isDisplayed$.subscribe((state) => {
      this.isDisplayed = state;
    });
  }

  ngOnDestroy(): void {
    this.cropModal.isDisplayed$.unsubscribe();
    this.cropModal.info$.unsubscribe();
  }

  setStyle(): void {
    this.style = {
      'background-color': `rgba(0, 0, 0, ${this.props.opacity})`,
    };
  }

  setImageToCrop(index: number): void {
    this.imageFile = this.props.pictures[index];
  }

  getInfos(): void {
    this.cropModal.info$.subscribe((infos: any) => {
      const { props } = infos;
      this.props = { ...props };
      this.picturesPreview = props ? props.pictures : [];
      this.setStyle();
    });
  }

  exit(): void {
    this.cropModal.switch();
  }

  closeModal(): void {
    if (!this.props.closeOnClick) return;
    this.cropModal.switch();
  }
}
