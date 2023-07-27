import { Component } from '@angular/core';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  majors: Array<Major> = [
    {id: 1,name: 'Computer Science'},
    {id: 2, name: 'Math'}
  ]

  lifestyles: Array<Lifestyle> = [
    {name: 'Outdoorsey'},
    {name: 'Nightlife'},
    {name: 'Bookworm'}
  ]

  selectedMajor = this.majors[0];
  selectedLifestyle = this.lifestyles[0];
}

interface Major {
  name: string,
  id: number
}

interface Lifestyle {
  name: string
}


// salary, lifestyle
