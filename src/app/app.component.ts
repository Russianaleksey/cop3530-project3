import { Component, OnInit, ViewChild } from '@angular/core';
import { Preferences } from './preferences/preferences.component';
import { MapComponent, MapNode } from './map/map.component';
import { Data } from './data';
import { CustomSorting, maxHeapBased } from 'src/datastructures';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MapComponent)
  mapComponent: MapComponent;

  title = 'MoveAdvisor';
  state: string[] = [];
  lifestyle: string[] = [];
  major: string = '';
  salary: number = 0;
  allData: Array<MapNode> = Data.getData();
  currentNodes: Array<MapNode>=  [];
  quicksortDS: CustomSorting<MapNode>;
  priorityQueue: maxHeapBased<MapNode>; 

  ngOnInit(): void {
    this.quicksortDS = new CustomSorting<MapNode>();
    this.priorityQueue = new maxHeapBased<MapNode>();
  }
  changeMajor(event: any) {
    this.major = event;
  }

  changeLifestyle(event: any) {
    this.lifestyle.push(event);
  }

  changeState(event: any) {
    this.state.push(event);
  }

  changeSalary(event: any) {
    this.salary = event;
  }

  changeCurrent() {
    this.currentNodes = []
    this.quicksortDS.empty();
    for(let i = 0; i < 20; i++) {
      let randomMapNode = this.allData[Math.floor(Math.random() * this.allData.length)];
      let randomPriority = Math.floor(Math.random() * 50000);
      this.currentNodes.push(randomMapNode);
      this.priorityQueue.push(randomMapNode, randomPriority);
      this.quicksortDS.push(randomPriority, randomMapNode);
    }
    let p = this.quicksortDS.getTopNNodesOnly(10);
    let pq = this.priorityQueue.topNDataOnly(10);
    

    let quicksort = this.quicksortDS.getTopNWithPriority(10);
    let pqWithPrio = this.priorityQueue.topNWithPriority(10);

    console.log("Priority queue results: \n");
    for (let i = 0; i < pq.length; ++i)
      console.log(`City: ${pqWithPrio[i].data.city}, Priority: ${pqWithPrio[i].priority}`);

    console.log("\n\nQuickSort results: \n");
    for (let i = 0; i < p.length; ++i)
      console.log(`City: ${quicksort[i].data.city}, Priority: ${quicksort[i].priority}`);
    this.mapComponent.refreshMarkers(p);
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
  // TODO: refactor to iterate through all preferred states
  if(node.state == prefs.state) {
    score += 1500;
  }
  let yearsToPayOff = node.zhvi / prefs.salary;
  return score;
};