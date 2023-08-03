import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
})

export class PreferencesComponent {
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

  lifestyles = ['outdoorsy', 'bookworm', 'scholar', 'nightlife'];
  selectedLifestyle = this.lifestyles[0];

  states = [
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

  handleMajorChange(event: any) {
    // console.log('data sent to parent: ', event);
    this.majorChange.emit(event);
  }

  handleLifestyleChange(event: any) {
    // console.log('data sent to parent: ', event);
    this.lifestyleChange.emit(event);
  }

  handleStateChange(event: any) {
    // console.log('data sent to parent: ', event);
    this.stateChange.emit(event);
  }

  handleSalaryChange(event: any) {
    // console.log('data sent to parent: ', event);
    this.salaryChange.emit(event);
  }
}
