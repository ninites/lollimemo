import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dots',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.scss'],
})
export class DotsComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() selected: boolean = false;
  constructor() {}
  ngOnInit(): void {}
}
