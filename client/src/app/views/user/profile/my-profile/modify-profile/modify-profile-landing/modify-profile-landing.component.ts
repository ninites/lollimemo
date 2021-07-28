import { Component, OnInit } from '@angular/core';
import { routeMain } from 'src/app/animations/animations';

@Component({
  selector: 'app-modify-profile-landing',
  templateUrl: './modify-profile-landing.component.html',
  styleUrls: ['./modify-profile-landing.component.scss'],
  animations: [routeMain],
})
export class ModifyProfileLandingComponent implements OnInit {
  constructor() {}

  linkList: { value: string; href: string[] }[] = [
    { value: 'Modifier mon profile', href: ['/user/profile/my-profile'] },
    {
      value: 'Modifier mon mot de passe',
      href: ['/user/profile/my-profile/password'],
    },
  ];

  ngOnInit(): void {}
}
