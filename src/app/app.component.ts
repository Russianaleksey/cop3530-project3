import { Component, OnInit } from '@angular/core';
import { Preferences } from './preferences/preferences.component';
import { MapNode } from './map/map.component';
import { Data } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'project2';
  state: string = '';
  lifestyle: string = '';
  major: string = '';
  salary: number = 0;
  allData: Array<MapNode> = Data.getData();
  currentNodes: Array<MapNode>;

  ngOnInit(): void {
    this.currentNodes = [this.allData[0]]
  }
  changeMajor(event: any) {
    this.major = event;
  }

  changeLifestyle(event: any) {
    this.lifestyle = event;
  }

  changeState(event: any) {
    this.state = event;
  }

  changeSalary(event: any) {
    this.salary = event;
  }
}
//'outdoorsy', 'bookworm', 'scholar', 'nightlife', 'secluded', 'opulent', 'suburban', 'rural'
let tagMap = new Map<string, number>([
  ['high-tech', 1000],
  ['medium-tech', 800],
  ['low-tech', 400],
  ['outdoorsy', 600],
  ['bookworm', 200],
  ['nightlife', 600],
  ['scholar', 450],
  ['secluded', 500],
  ['financehub', 1000],
  ['suburban', 300],
  ['rural', 800],
  ['opulent', 600]
]);

let generateScore = function (prefs: Preferences, node: MapNode): number {
  let score = 0;
  if(node.tags !== null && node.tags?.length != 0) {
    node.tags?.forEach(t => {
      let val = tagMap.get(t);
      score += val ? val : 0;
    });
  }
  // TODO: refactor to iterate through all preferred states
  if(node.state == prefs.state) {
    score += 1500;
  }
  let yearsToPayOff = node.zhvi / prefs.salary;


  return score;
};