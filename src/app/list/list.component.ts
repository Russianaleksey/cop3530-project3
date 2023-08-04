import { Component, Input } from '@angular/core';
import { MapNode } from '../map/map.component';
import { ListrowComponent } from '../listrow/listrow.component';

@Component({
  selector: 'app-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  nodes: Array<MapNode> = [];
  setCurrentNodes(nList: Array<MapNode>) {
    this.nodes = nList;
  }
}


