import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-landing',
  templateUrl: './theme-landing.component.html',
  styleUrls: ['./theme-landing.component.scss'],
})
export class ThemeLandingComponent implements OnInit {
  themesCrud: { [key: string]: any }[] = [
    { value: 'Ajouter un theme', link: ['/user/profile/themes/post'] },
  ];

  constructor() {}

  ngOnInit(): void {}
}
