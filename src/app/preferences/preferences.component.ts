import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
})

export class PreferencesComponent implements OnInit {
  @Output() majorChange = new EventEmitter<string>();
  @Output() lifestyleChange = new EventEmitter<string>();
  @Output() stateChange = new EventEmitter<string>();
  @Output() salaryChange = new EventEmitter<number>();

  salary: number = 0;

  majors = [
    'computer science',
    'math',
    'statistics',
    'economics',
    'business',
    'finance',
    'accounting',
    'other',
  ];
  selectedMajor = this.majors[0];

  lifestyles = ['outdoorsy', 'bookworm', 'scholar', 'nightlife', 'secluded', 'opulent', 'suburban', 'rural'];
  selectedLifestyle = this.lifestyles[0];

  states = [
    'none',
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IA',
    'IN',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];
  selectedState = this.states[0];

  ngOnInit(): void {
    this.majorChange.emit(this.selectedMajor);
    this.lifestyleChange.emit(this.selectedLifestyle);
    this.salaryChange.emit(this.salary);
    this.stateChange.emit(this.selectedState);
  }

  handleMajorChange(event: any) {
    this.majorChange.emit(event);
  }

  handleLifestyleChange(event: any) {
    this.lifestyleChange.emit(event);
  }

  handleStateChange(event: any) {
    this.stateChange.emit(event);
  }

  handleSalaryChange(event: any) {
    this.salaryChange.emit(event);
  }
}

export interface Preferences {
  major: string
  lifestyle: Array<string>
  state: Array<string>;
  salary: number
}