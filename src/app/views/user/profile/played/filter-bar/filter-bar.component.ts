import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  @Output() filteredChange = new EventEmitter<{ [key: string]: any }>();
  @Input() filters: { [key: string]: any } = {};

  constructor() {}

  select: { [key: string]: any } = {
    difficulty: {
      choices: ['facile', 'normal'],
      selected: '',
    },
    type: {
      choices: ['solo', 'multi'],
      selected: '',
    },
  };

  ngOnInit(): void {
    this.initFilters();
  }

  initFilters(): void {
    for (const key in this.filters) {
      this.select[key].selected = this.filters[key];
    }
  }

  filtered(reset: boolean) {
    const filteredResult: { [key: string]: any } = {};

    if (reset) {
      for (const key in this.select) {
        this.select[key].selected = '';
      }
    }

    if (!reset) {
      for (const key in this.select) {
        if (this.select[key].selected) {
          filteredResult[key] = this.select[key].selected;
        }
      }
    }

    this.filteredChange.emit(filteredResult);
  }
}
