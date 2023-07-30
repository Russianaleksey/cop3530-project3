import { Component } from '@angular/core';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  userPreferences: Array<UserPreference> =
    [
      new UserPreference('major', ['computer science', 'math']),
      new UserPreference('lifestyle', ['outdoorsy', 'bookworm', 'scholar', 'nightlife'])
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