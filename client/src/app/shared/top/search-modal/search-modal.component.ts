import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { opacityAnim } from 'src/app/animations/animations';
import { RequestService } from 'src/app/core/services/request/request.service';
import { environment } from 'src/environments/environment';
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

  onSubmit(): void {
    if (!this.searchField.controls.q.valid) {
      return;
    }
    this.isLoading = true;
    const parameters = {
      key: environment.googleSearch,
      cx: environment.googleSearchCx,
      q: this.searchField.value.q,
      num: 10,
      imgSize: 'medium',
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
          console.log(this.searchResult);
          
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        },
      });
  }
}
