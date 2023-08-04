import { Component, ViewChild, Input } from '@angular/core';
import { MapComponent, MapNode } from '../map/map.component';
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

  @Input() map: MapComponent;

  propegateNodes(nodes: Array<MapNode>) {
    this.listComponent.setCurrentNodes(nodes);
  }
}