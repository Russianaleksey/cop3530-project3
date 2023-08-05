import { Component, Input } from '@angular/core';
import { MapComponent, MapNode } from '../map/map.component';
import { ListrowComponent } from '../listrow/listrow.component';

@Component({
  selector: 'app-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  //inputs property to receive the MapComponent instance from the parent component
  @Input() map: MapComponent;

  //array to store the MapNode objects representing the nodes to be displayed in the list
  nodes: Array<MapNode> = [];

  // updates the nodes in the list with the given node list
  setCurrentNodes(nList: Array<MapNode>) {
    this.nodes = nList;
  }

  //hanldes events for list row click events
  handleListRowClick(event: any) {
    console.log(event);
  }
}



