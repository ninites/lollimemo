import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { opacityAnim } from 'src/app/animations/animations';
import { ModalService } from './modal.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [opacityAnim],
})
export class ModalComponent implements OnInit {
  @Input() closeOnClick: boolean = true;
  @Input() opacity: number = 0.3;

  style: { [key: string]: any } = {};

  constructor(private el: ElementRef, private modalSrv: ModalService) {}

  ngOnInit(): void {
    document.body.append(this.el.nativeElement);

    this.style = {
      'background-color': `rgba(0, 0, 0, ${this.opacity})`,
    };
  }

  removeModal(e: any): void {
    if (!this.closeOnClick) return;
    this.modalSrv.switchModal();
  }
}
