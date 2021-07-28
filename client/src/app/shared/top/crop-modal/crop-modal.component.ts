import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
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
  constructor(
    private cropModal: CropModalService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  style: { [key: string]: any } = {};
  isDisplayed: boolean = false;
  props: { [key: string]: any } = {};
  picturesPreview: any[] = [];
  imgCroppedIndex: number = 0;
  confirmChange = true;
  topValue: number = 0;

  imageFile: any = '';
  croppedImage: any = '';

  imageCropped(event: ImageCroppedEvent) {
    this.confirmChange = true;
    this.croppedImage = event.base64;
  }

  ngOnInit(): void {
    this.getInfos();
    this.cropModal.isDisplayed$.subscribe((state) => {
      this.isDisplayed = state;
      if (state) {
        this.document.body.style.overflow = 'hidden';
        this.imageFile = this.props.pictures && this.props.pictures[0];
      } else {
        this.document.body.style.overflow = '';
      }
    });
  }

  setStyle(): void {
    this.style = {
      'background-color': `rgba(0, 0, 0, ${this.props.opacity})`,
      top: this.topValue + 'px',
    };
  }

  setImageToCrop(index: number): void {
    this.imgCroppedIndex = index;
    this.imageFile = this.props.pictures[index];
  }

  async saveChanges() {
    const url = this.croppedImage;
    const base64 = await fetch(url);
    const blob = await base64.blob();
    const name = this.picturesPreview[this.imgCroppedIndex].name;
    const file = new File([blob], name, { type: 'image/png' });
    this.picturesPreview[this.imgCroppedIndex] = file;
    this.confirmChange = false;
  }

  getInfos(): void {
    this.cropModal.info$.subscribe((infos: any) => {
      const { props } = infos;
      this.props = { ...props };
      this.picturesPreview = props ? [...props.pictures] : [];
      this.topValue = this.document.body.scrollTop;
      this.setStyle();
    });
  }

  exit(): void {
    this.props.result({
      type: this.props.type,
      payload: this.picturesPreview,
    });
    this.cropModal.switch();
    this.reset();
  }

  reset(): void {
    this.croppedImage = '';
    this.props = {};
    this.cropModal.info$.next({});
    this.imageFile = '';
  }

  closeModal(): void {
    if (!this.props.closeOnClick) return;
    this.cropModal.switch();
  }
}
