import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { opacityAnim } from 'src/app/animations/animations';
import { RequestService } from 'src/app/core/services/request/request.service';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alert/alert.service';
import { SearchModalService } from './search-modal.service';

@Component({
  selector: 'search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  animations: [opacityAnim],
})
export class SearchModalComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private request: RequestService,
    private searchModalService: SearchModalService,
    private alert: AlertService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  style: { [key: string]: any } = {};
  isDisplayed: boolean = false;
  props: { [key: string]: any } = {};
  topValue: number = 0;
  searchField = this.fb.group({
    q: ['', Validators.required],
  });
  isLoading: boolean = false;
  searchResult: { [key: string]: any }[] = [];
  userSelection: string[] = [];

  ngOnInit(): void {
    this.displayed();
    this.getInfos();
  }

  displayed(): void {
    this.searchModalService.isDisplayed$.subscribe((state) => {
      this.isDisplayed = state;
      if (state) {
        this.document.body.style.overflow = 'hidden';
      } else {
        this.document.body.style.overflow = '';
        this.reset();
      }
    });
  }

  getInfos(): void {
    this.searchModalService.info$.subscribe((infos) => {
      this.props = { ...infos };
      this.setStyle();
    });
  }

  setStyle(): void {
    this.topValue = this.document.body.scrollTop;
    this.style = {
      'background-color': `rgba(0, 0, 0, ${this.props.opacity})`,
      top: this.topValue + 'px',
    };
  }

  exit(): void {
    this.searchModalService.switch();
  }

  closeModal(): void {
    if (!this.props.closeOnClick) return;
    this.searchModalService.switch();
  }

  saveResult(): void {
    const payload: any = [];
    this.searchResult.forEach((result) => {
      const searchResultThumbTitle = result.image.thumbnailLink;
      this.userSelection.forEach((url) => {
        if (url === searchResultThumbTitle) {
          this.getFileFromUrl(url, result.title, result.fileFormat).subscribe(
            (file) => {
              payload.push(file);
              this.searchModalService.userSelection$.next({
                type: this.props.type,
                payload: payload,
              });
            }
          );
        }
      });
    });
  }

  reset(): void {
    this.searchModalService.userSelection$.next({ type: '', payload: [{}] });
    this.searchField.reset();
    this.userSelection = [];
    this.searchResult = [];
  }

  addToUserChoice(data: { picture: string; checked: boolean }): void {
    const { picture, checked } = data;

    if (!checked) {
      this.userSelection = this.userSelection.filter((url) => {
        return url !== picture;
      });
    }

    if (checked) {
      const infinite = this.props.maxChoice === 0;
      const overMax = this.userSelection.length >= this.props.maxChoice;

      if (!infinite && overMax) {
        this.alert.message = `Vous ne pouvez pas selectionner plus de ${this.props.maxChoice} images`;
        this.alert.switchAlert();
      }

      this.userSelection = [...this.userSelection, picture];
    }
  }

  getFileFromUrl(
    url: string,
    title: string,
    fileFormat: string
  ): Observable<any> {
    const data$ = from(fetch(url)).pipe(
      switchMap((response) => {
        return response.blob();
      }),
      map((blob) => {
        return new File([blob], title, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
      })
    );
    return data$;
  }

  onSubmit(): void {
    if (!this.searchField.controls.q.valid) {
      return;
    }

    this.userSelection = [];
    this.isLoading = true;

    const parameters = {
      key: environment.googleSearch,
      cx: environment.googleSearchCx,
      q: this.searchField.value.q,
      searchType: 'image',
    };

    this.request
      .getExternal(environment.googleSearchUrl, parameters)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.searchResult = [...response.items];
          this.searchField.reset();
        },
        error: (error) => {
          this.isLoading = false;
          this.alert.message = 'Un probléme de requete a eu lieu';
          this.alert.switchAlert();
          this.searchField.reset();
        },
      });
  }
}
