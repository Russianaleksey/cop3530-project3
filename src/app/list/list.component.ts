import { Component, Input } from '@angular/core';
import { MapComponent, MapNode } from '../map/map.component';
import { ListrowComponent } from '../listrow/listrow.component';

@Component({
  selector: 'app-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input() map: MapComponent;
  nodes: Array<MapNode> = [];
  setCurrentNodes(nList: Array<MapNode>) {
    this.nodes = nList;
  }

  handleListRowClick(event: any) {
    console.log(event)
  }
}


