import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { opacityAnim, popAnim } from 'src/app/animations/animations';
import { RegPopService } from './reg-pop.service';

@Component({
  selector: 'reg-pop',
  templateUrl: './reg-pop.component.html',
  styleUrls: ['./reg-pop.component.scss'],
  animations: [popAnim],
})
export class RegPopComponent implements OnInit {
  @Input() closeOnClick: boolean = true;
  @Input() opacity: number = 0;

  style: { [key: string]: any } = {};
  isDisplayed: boolean = false;

  constructor(private el: ElementRef, private regPopService: RegPopService) {}

  ngOnInit(): void {
    this.regPopService.getRegPopDisplay().subscribe((isDisplayed) => {
      this.isDisplayed = isDisplayed;
      if (isDisplayed) {
        document.body.append(this.el.nativeElement);
        this.style = {
          'background-color': `rgba(0, 0, 0, ${this.opacity})`,
        };
      } else {
        this.el.nativeElement.remove();
      }
    });
  }

  removeModal(e: any): void {
    if (!this.closeOnClick) return;
    this.regPopService.switchModal();
  }

 
}
