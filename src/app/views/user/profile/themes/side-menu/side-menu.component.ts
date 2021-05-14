import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Input() display: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const divToMove = ['.root', '.navBar'];
    divToMove.forEach((div) => {
      const element: any = this.document.querySelector<HTMLElement>(div);
      this.display
        ? (element.style.marginLeft = '150px')
        : (element.style.marginLeft = '0px');
    });
  }
}
