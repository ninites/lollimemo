import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AlertService } from '../../top/alert/alert.service';

@Component({
  selector: 'reg-file',
  templateUrl: './reg-file.component.html',
  styleUrls: ['./reg-file.component.scss'],
})
export class RegFileComponent implements OnInit {
  constructor(
    private controlContainer: ControlContainer,
    private alert: AlertService
  ) {}
  @Input() parentForm: any;
  @Input() controlName: string = '';
  @Input() width: number = 0;
  @Input() multiple: boolean = false;
  @Input() multiMax: number | undefined = undefined;
  @Input() labelValue: string = 'Ajouter des images';
  style: { [key: string]: any } = {};

  ngOnInit(): void {
    this.parentForm = this.controlContainer.control;
    this.parentHandler();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.style = {
      width: this.width + 'px',
    };
  }

  parentHandler(): void {
    this.parentForm.valueChanges
      .pipe(map((values: any) => values[this.controlName]))
      .subscribe((value: any) => {
        if (value) {
          this.labelValue =
            value.length > 0 ? 'Fichier(s) Ajouté(s)' : this.labelValue;
        }
      });
  }

  onChange(event: any): void {
    if (this.multiMax) {
      const tooMuchPictures =
        event.target.files.length +
          this.parentForm.value[this.controlName].length >
        this.multiMax;

      if (tooMuchPictures) {
        this.alert.message = `Vous essayez de rajouter ${
          event.target.files.length -
          (this.multiMax - this.parentForm.value[this.controlName].length)
        } photos en trop`;
        this.alert.switchAlert();
        return;
      }
    }

    if (event.target.files && event.target.files.length > 0) {
      if (this.multiple) {
        this.parentForm.patchValue({
          [this.controlName]: [
            ...this.parentForm.value[this.controlName],
            ...event.target.files,
          ],
        });
      } else {
        this.parentForm.patchValue({
          [this.controlName]: event.target.files,
        });
      }
    }
  }
}
