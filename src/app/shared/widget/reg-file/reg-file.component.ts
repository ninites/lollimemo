import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'reg-file',
  templateUrl: './reg-file.component.html',
  styleUrls: ['./reg-file.component.scss'],
})
export class RegFileComponent implements OnInit {
  @Input() parentForm: any;
  @Input() width: number = 0;

  labelValue: string = 'Ajouter des images';
  style: { [key: string]: any } = {};
  constructor(private controlContainer: ControlContainer) {}

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
      .pipe(map((values: any) => values.pictures))
      .subscribe((value: any) => {
        this.labelValue =
          value.length > 0 ? 'Fichier(s) Ajouté(s)' : 'Ajouter des images';
      });
  }

  onChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.parentForm.patchValue({
        pictures: [...this.parentForm.value.pictures, ...event.target.files],
      });
    }
  }
}
