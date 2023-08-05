import { Component, OnInit, ViewChild } from '@angular/core';
import { Preferences } from './preferences/preferences.component';
import { MapComponent, MapNode } from './map/map.component';
import { Data } from './data';
import { CustomSorting, ShellSort } from 'src/datastructures';
import { ResultsComponent } from './results/results.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MapComponent)
  mapComponent: MapComponent;

  @ViewChild(ResultsComponent)
  resultsComponent: ResultsComponent;

  title = 'MoveAdvisor';
  state: string[] = [];
  lifestyle: string[] = [];
  major: string = '';
  salary: number = 0;
  allData: Array<MapNode> = Data.getData();
  currentNodes: Array<MapNode>=  [];
  quicksortDS: CustomSorting<MapNode>;
  shellSort: ShellSort<MapNode>;

  ngOnInit(): void {
    this.quicksortDS = new CustomSorting<MapNode>();
    this.shellSort = new ShellSort<MapNode>();
  }
  changeMajor(event: any) {
    this.major = event;
    console.log(this.major);
    this.reprocessAllNodes();
  }

  changeLifestyle(event: any) {
    this.lifestyle = event;
    console.log(this.lifestyle);
    this.reprocessAllNodes();
  }

  changeState(event: any) {
    this.state = event;
    console.log(this.state);
    this.reprocessAllNodes();
  }

  changeSalary(event: any) {
    this.salary = event;
    console.log(this.salary);
    this.reprocessAllNodes();
  }

  changeCurrent() {
    let count = 0;
    for(let i = 0; i < this.allData.length; i++) {
      count += this.allData[i].city == '' ? 1 : 0;
    }
    this.currentNodes = [];
    this.quicksortDS.empty();
    this.quicksortDS.empty();
    for(let i = 0; i < 20; i++) {
      let randomMapNode = this.allData[Math.floor(Math.random() * this.allData.length)];
      let randomPriority = Math.floor(Math.random() * 50000);
      this.currentNodes.push(randomMapNode);
      this.shellSort.push(randomMapNode, randomPriority);
      this.quicksortDS.push(randomPriority, randomMapNode);
    }
    let p = this.quicksortDS.getTopNNodesOnly(10);
    let pq = this.shellSort.topNDataOnly(10);
    this.resultsComponent.propegateNodes(pq);
    
    this.mapComponent.refreshMarkers(pq);
  }
/*
export interface Preferences {
  major: string
  lifestyle: Array<string>
  state: Array<string>
  salary: number
}
*/
  reprocessAllNodes() {
    this.currentNodes = [];
    this.quicksortDS.empty();
    this.shellSort.empty();
    let pref: Preferences = {major: this.major, lifestyle: this.lifestyle, state: this.state, salary: this.salary};
    console.log(pref)

    this.allData.forEach(node => {
      let score = generateScore(pref, node);
      this.shellSort.push(node, score);
      this.quicksortDS.push(score, node);
    });

    let shellSortResults = this.shellSort.topNDataOnly(10);
    let quickSortResults = this.quicksortDS.getTopNNodesOnly(10);
    this.resultsComponent.propegateNodes(shellSortResults);
    this.mapComponent.refreshMarkers(shellSortResults);
    this.currentNodes = shellSortResults;
    console.log('done processing');
  }
}
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


// TODO: refactor to handle multiple options in the preferences. Did we already change above to handle multiple? idk
let generateScore = function (prefs: Preferences, node: MapNode): number {
  let score = 0;
  if(node.tags !== null && node.tags?.length != 0) {
    node.tags?.forEach(t => {
      let val = tagMap.get(t);
      score += val ? val : 0;
    });
  }

  if(prefs.state.includes(node.state)) {
    score += 1500;
  }
  let yearsToPayOff = node.zhvi / prefs.salary;
  score += 10000/yearsToPayOff;
  return score;
};
