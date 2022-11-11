import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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
    private fb: UntypedFormBuilder,
    private request: RequestService,
    private searchModalService: SearchModalService,
    private alert: AlertService,
    @Inject(DOCUMENT) private document: Document
  ) { }

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
  quitButtonStyle = { marginRight: "10px" }
  actualPage = 0

  ngOnInit(): void {
    this.displayed();
    this.getInfos();
    this.searchField.valueChanges.subscribe(() => {
      this.actualPage = 0
    })
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

  saveResultAndExit() {
    this.saveResult()
    this.exit()
  }

  reset(): void {
    this.searchModalService.userSelection$.next({ type: '', payload: [{}] });
    this.searchField.reset();
    this.userSelection = [];
    this.searchResult = [];
  }

  addToUserChoice(data: { picture: string; checked: boolean }): void {
    const { picture, checked } = data;
    const actualFile = this.searchResult[this.getSearchResultIndex(picture)];


    if (!checked) {
      this.userSelection = this.userSelection.filter(
        (file: { [key: string]: any }) => {
          return file.name !== actualFile.title.trim();
        }
      );
    }

    if (checked) {
      const infinite = this.props.maxChoice === 0;
      const overMax = this.userSelection.length >= this.props.maxChoice;

      if (!infinite && overMax) {
        this.alert.message = `Vous ne pouvez pas selectionner plus de ${this.props.maxChoice} images`;
        this.alert.switchAlert();
      }

      actualFile.isLoading = true
      this.getFileFromUrl(
        actualFile.original,
        actualFile.title,
        actualFile.fileFormat
      ).subscribe({
        next: (file) => {
          this.userSelection = [...this.userSelection, file];
          actualFile.isLoading = false
        },
        error: (error) => {
          actualFile.isLoading = false
          this.alert.message = `L'image ne peut pas etre sauvegardée`;
          this.alert.switchAlert();
        }
      });
    }
  }

  getSearchResultIndex(url: string): number {
    return this.searchResult.findIndex((result) => {
      const searchResultThumbTitle = result.thumbnail;
      return url === searchResultThumbTitle;
    });
  }

  getFileFromUrl(
    url: string,
    title: string,
    fileFormat: string
  ): Observable<any> {

    const urlWithCORSPROXY = environment.corsProxyURL + url

    const data$ = from(fetch(urlWithCORSPROXY)).pipe(
      switchMap((response) => {
        return response.blob();
      }),
      map((blob: any) => {
        return new File([blob], title.trim(), {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
      }),
      catchError((error) => {
        throw new Error(error)
      }),
    );
    return data$;
  }

  changePage(type: string) {
    if (type === "previous" && this.actualPage !== 0) {
      this.actualPage -= 1
      this.onSubmit()
    }

    if (type === "next") {
      this.actualPage += 1
      this.onSubmit()
    }
  }

  onSubmit(): void {
    if (!this.searchField.controls.q.valid) {
      return;
    }

    this.isLoading = true;

    const parameters = {
      textSearch: this.searchField.value.q,
      page: this.actualPage
    };

    this.request.searchImages(parameters).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.searchResult = response.map((image: any) => {
          image.isLoading = false
          return image
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.alert.message = 'Un probléme de requete a eu lieu';
        this.alert.switchAlert();
        this.searchField.reset();
      },
    })

  }
}
