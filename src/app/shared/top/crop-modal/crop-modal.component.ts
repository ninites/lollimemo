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
  constructor(private cropModal: CropModalService, private fb: FormBuilder) {}

  style: { [key: string]: any } = {};
  isDisplayed: boolean = false;
  props: { [key: string]: any } = {};
  cropForm = this.fb.group({});
  controlName: string = '';

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
    this.pictureHandler();
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

  pictureHandler(): void {
    this.cropForm.valueChanges
      .pipe(
        filter((data: any) => {
          return data[this.controlName];
        })
      )
      .subscribe((result: any) => {
        this.imageFile = result[this.controlName][0];
        this.cropModal.results$.next(result);
      });
  }

  getInfos(): void {
    this.cropModal.info$.subscribe((infos: any) => {
      const { parentForm, props } = infos;
      this.props = { ...props };
      for (const key in parentForm) {
        const [value, validator] = parentForm[key];
        this.cropForm.addControl(key, new FormControl(value, validator));
        this.controlName = key;
      }
      this.setStyle();
    });
  }

  closeModal(): void {
    if (!this.props.closeOnClick) return;
    this.cropModal.switch();
  }
}
