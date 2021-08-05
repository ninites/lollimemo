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
  userSelection: { [key: string]: any }[] = [];

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
    this.searchModalService.userSelection$.next({
      type: this.props.type,
      payload: this.userSelection,
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
      const isHere = this.userSelection.findIndex((image) => {
        image.name.trim() === this.createFileTitle(picture).trim();
      });
      console.log(isHere);

      this.userSelection = this.userSelection.filter((image) => {
        image.name !== this.createFileTitle(picture);
      });
      return;
    }

    if (checked) {
      // const infinite = this.props.maxChoice === 0;
      // const overMax = this.userSelection.length >= this.props.maxChoice;

      // if (!infinite && overMax) {
      //   this.alert.message = `Vous ne pouvez pas selectionner plus de ${this.props.maxChoice} images`;
      //   this.alert.switchAlert();
      //   return;
      // }

      this.getFileFromUrl(data.picture).subscribe((file) => {
        this.userSelection = [...this.userSelection, file];
        console.log(this.userSelection);
      });
    }
  }

  getFileFromUrl(url: string): Observable<any> {
    const data$ = from(fetch(url)).pipe(
      switchMap((response) => {
        return response.blob();
      }),
      map((blob) => {
        return new File([blob], this.createFileTitle(url), {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
      })
    );
    return data$;
  }

  createFileTitle(url: string): string {
    const fullUrl = new URL(url);
    const title =
      fullUrl.search.split(':')[fullUrl.search.split(':').length - 1];
    return title;
  }

  onSubmit(): void {
    if (!this.searchField.controls.q.valid) {
      return;
    }
    this.isLoading = true;
    this.searchField.reset();
    const parameters = {
      key: environment.googleSearch,
      cx: environment.googleSearchCx,
      q: this.searchField.value.q,
      searchType: 'image',
    };
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    this.request
      .getExternal(environment.googleSearchUrl, parameters, headers)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.searchResult = [...response.items];
          console.log(response);
        },
        error: (error) => {
          this.isLoading = false;
          this.alert.message = 'Un probléme de requete a eu lieu';
          this.alert.switchAlert();
        },
      });
  }
}
