import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { filter } from 'rxjs/operators';
import { opacityAnim } from 'src/app/animations/animations';
import { RequestService } from 'src/app/core/services/request/request.service';
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
    private request: RequestService
  ) {}

  style: { [key: string]: any } = {};
  isDisplayed: boolean = false;
  props: { [key: string]: any } = {};
  picturesPreview: any[] = [];
  imgCroppedIndex: number = 0;
  confirmChange = true;

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
      this.setStyle();
    });
  }

  exit(): void {
    this.cropModal.cropResults$.next({
      type: this.props.type,
      payload: this.picturesPreview,
    });
    this.cropModal.switch();
  }

  closeModal(): void {
    if (!this.props.closeOnClick) return;
    this.cropModal.switch();
  }
}
