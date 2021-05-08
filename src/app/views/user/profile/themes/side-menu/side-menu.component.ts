import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Input() display: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
