import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { popAnim } from 'src/app/animations/animations';

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  animations: [popAnim],
})
export class FilterBarComponent implements OnInit {
  @Output() filteredChange = new EventEmitter<{ [key: string]: any }>();
  @Input() filters: { [key: string]: any } = {};

  constructor(private fb: FormBuilder) {}

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

  opponentForm = this.fb.group({
    name: [''],
  });

  ngOnInit(): void {
    this.initFilters();
  }

  initFilters(): void {
    for (const key in this.filters) {
      if (this.select[key]) {
        this.select[key].selected = this.filters[key];
      }

      if (key === 'opponent') {
        this.opponentForm.patchValue({ name: this.filters.opponent });
      }
    }
  }

  filtered(reset: boolean) {
    const filteredResult: { [key: string]: any } = {};
    const opponentName = this.opponentForm.value.name;

    if (reset) {
      for (const key in this.select) {
        this.select[key].selected = '';
      }

      this.opponentForm.reset();
    }

    if (!reset) {
      for (const key in this.select) {
        if (this.select[key].selected) {
          filteredResult[key] = this.select[key].selected;
        }
      }
      if (opponentName) {
        filteredResult.opponent = opponentName.trim();
      }
    }

    this.filteredChange.emit(filteredResult);
  }
}
