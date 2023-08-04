import { Component, ViewChild } from '@angular/core';
import { MapNode } from '../map/map.component';
import { Data } from '../data';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @ViewChild(ListComponent)
  listComponent: ListComponent

  propegateNodes(nodes: Array<MapNode>) {
    this.listComponent.setCurrentNodes(nodes);
  }
}