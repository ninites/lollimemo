import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'profile-selection',
  templateUrl: './profile-selection.component.html',
  styleUrls: ['./profile-selection.component.scss'],
})
export class ProfileSelectionComponent implements OnInit {
  constructor() { }
  @ViewChild('profileselection') profDoc: ElementRef = {} as ElementRef;

  userOptions: { [key: string]: any }[] = [
    { icon: "fas fa-info", value: 'Infos', link: ['/user/profile/my-profile'] },
    { icon: "fas fa-paint-roller", value: 'Themes', link: ['/user/profile/themes'] },
    { icon: "fas fa-gamepad", value: 'Parties', link: ['/user/profile/played'] },
  ];

  style: { [key: string]: any } = {};

  ngAfterViewInit() {
    const width = this.profDoc.nativeElement.offsetWidth;
    this.profDoc.nativeElement.style.left = (width / 5) * -1 + 'px';
  }

  ngOnInit(): void { }
}
