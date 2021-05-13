import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/core/services/request/request.service';
import { AlertService } from 'src/app/shared/top/alert/alert.service';
import SwiperCore, { Navigation } from 'swiper/core';
@Component({
  selector: 'delete-theme',
  templateUrl: './delete-theme.component.html',
  styleUrls: ['./delete-theme.component.scss'],
})
export class DeleteThemeComponent implements OnInit {
  constructor(private request: RequestService, private alert: AlertService) {}

  userThemes: { [key: string]: any }[] = [];

  ngOnInit(): void {
    SwiperCore.use([Navigation]);
    this.getThemes();
  }

  delete(themeId: string): void {
    this.request.delete('themes/' + themeId).subscribe({
      next: (resp) => {
        this.userThemes = this.userThemes.filter(
          (theme) => theme._id !== resp._id
        );
        this.alert.message = 'Theme correctement supprimé';
        this.alert.switchAlert();
      },
      error: (err) => {
        this.alert.message = err.error;
        this.alert.switchAlert();
      },
    });
  }

  getThemes(): void {
    this.request.get('themes/all').subscribe({
      next: (resp) => {
        this.userThemes = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
