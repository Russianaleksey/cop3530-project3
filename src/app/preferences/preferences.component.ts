import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})

// export class ItemOutputComponent {

//   @Output() newItemEvent = new EventEmitter<string>();

//   addNewItem(value: string) {
//     this.newItemEvent.emit(value);
//   }
// }

export class PreferencesComponent {
  @Output() majorChange = new EventEmitter<string>();
  @Output() lifestyleChange = new EventEmitter<string>();
  
  salary: number = 0;

  majors = ['computer science', 'math', 'statistics', 'economics', 'business', 'finance', 'accounting', 'other'];
  selectedMajor = this.majors[0];

  lifestyles = ['outdoorsy', 'bookworm', 'scholar', 'nightlife'];
  selectedLifestyle = this.lifestyles[0];

  states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IA', 'IN', 'KS', 'KY','LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT','NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH','OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT','VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
  selectedState = this.states[0];

  userPreferences: Array<UserPreference> =
    [
      new UserPreference('major', ['computer science', 'math', 'statistics', 'economics', 'business', 'finance', 'accounting', 'other']),
      new UserPreference('lifestyle', ['outdoorsy', 'bookworm', 'scholar', 'nightlife']),
      new UserPreference('state',['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IA', 'IN', 'KS', 'KY','LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT','NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH','OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT','VT', 'VA', 'WA', 'WV', 'WI', 'WY']),
    ];

    handleMajorChange(event: any) {
      console.log('new major change event: ' + event);
    }

    handleLifestyleChange(event: any) {
      console.log('new lifestyle change event: ' + event);
    }

    handleStateChange(event: any) {
      console.log('new state change event: ' + event);
    }

    handleSalaryChange(event: any) {
      console.log('new salary change event:' + event);
    }
}

class UserPreference {
  name: string;
  options: Array<string>;
  selectedOption: string;

  constructor(name:string , options: Array<string>) {
    this.name = name;
    this.options = options;
    this.selectedOption = options[0];
  }

  updateSelectedOption(index: number): void {
    if(index < this.options.length) {
      this.selectedOption = this.options[index];
    }
  }
}