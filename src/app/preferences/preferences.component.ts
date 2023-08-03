import { Component } from '@angular/core';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  salary: number = 0;
  userPreferences: Array<UserPreference> =
    [
      new UserPreference('major', ['computer science', 'math', 'statistics', 'economics', 'business', 'finance', 'accounting', 'other']),
      new UserPreference('lifestyle', ['outdoorsy', 'bookworm', 'scholar', 'nightlife']),
      new UserPreference('state',['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii','Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine','Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri','Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico','New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon','Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee','Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin','Wyoming']),
    ];
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