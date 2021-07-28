import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-landing',
  templateUrl: './theme-landing.component.html',
  styleUrls: ['./theme-landing.component.scss'],
})
export class ThemeLandingComponent implements OnInit {
  constructor(private cdref: ChangeDetectorRef) {}

  themesCrud: { [key: string]: any }[] = [
    { value: 'Ajouter un theme', link: ['/user/profile/themes/post'] },
  ];

  themePosition: any;
  themeSize: number = 0;

  forceIndexChange(index: number): void {
    this.themePosition = index;
    this.cdref.detectChanges();
  }

  getThemeLength(event: any): void {
    this.themeSize = event;
  }

  ngOnInit(): void {}
}
