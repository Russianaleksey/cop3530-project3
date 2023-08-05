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

  //initializes custom sorting data structures
  ngOnInit(): void {
    this.quicksortDS = new CustomSorting<MapNode>();
    this.shellSort = new ShellSort<MapNode>();
  }

  //handles the change of major in the preferences
  changeMajor(event: any) {
    this.major = event;
    //console.log(this.major);
    this.reprocessAllNodes();
  }

  changeLifestyle(event: any) {
    this.lifestyle = event;
    //console.log(this.lifestyle);
    this.reprocessAllNodes();
  }

  changeState(event: any) {
    this.state = event;
    //console.log(this.state);
    this.reprocessAllNodes();
  }

  changeSalary(event: any) {
    this.salary = event;
    //console.log(this.salary);
    this.reprocessAllNodes();
  }

  changeCurrentRandomly() {
    this.currentNodes = [];
    this.quicksortDS.empty();
    this.shellSort.empty();
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

// reprocesses all nodes based on the preferences and update the map and results
  reprocessAllNodes() {
    this.currentNodes = [];
    this.quicksortDS.empty();
    this.shellSort.empty();
    let pref: Preferences = {major: this.major, lifestyle: this.lifestyle, state: this.state, salary: this.salary};

    this.allData.forEach(node => {
      let score = generateScore(pref, node);
      this.shellSort.push(node, score);
      this.quicksortDS.push(score, node);
    });

    let shellStart = performance.now();
    let allShellSortResults = this.shellSort.getAllWithPriority();
    let shellTimeTaken = performance.now() - shellStart;

    let quickSortStart = performance.now();
    let allquickSortResults = this.quicksortDS.getAllWithPriority();
    let quickSortTimeTaken = performance.now() - quickSortStart;
    console.log("shell sort processing time: " + shellTimeTaken.toPrecision(5) + ' ms\n');
    console.log("quick sort processing time: " + quickSortTimeTaken.toPrecision(5) + ' ms\n');
    

    let shellSortResults = this.shellSort.topNDataOnly(10);
    let quickSortResults = this.quicksortDS.getTopNNodesOnly(10);
    this.resultsComponent.propegateNodes(shellSortResults);
    this.mapComponent.refreshMarkers(shellSortResults);
    this.currentNodes = shellSortResults;
  }
}

// create tags for each node
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


// assigns a score to each node based on preferences
let generateScore = function (prefs: Preferences, node: MapNode): number {
  let score = 0;
  if(node.tags !== null && node.tags?.length != 0) {
    node.tags?.forEach(t => {
      let val = tagMap.get(t);
      if(prefs.lifestyle.includes(t)) {
        score += val ? val*6 : 0;
      }
      else {
        score += val ? val : 0;
      }
    });
  }

  if(prefs.state.includes(node.state)) {
    score += 1000000;
  }
  return score;
};
