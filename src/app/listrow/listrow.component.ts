import { Component, Input } from '@angular/core';
import { MapComponent, MapNode } from '../map/map.component';

@Component({
  selector: 'app-listrow',
  templateUrl: './listrow.component.html',
  styleUrls: ['./listrow.component.css']
})
export class ListrowComponent {
  @Input() node: MapNode;
  @Input() map : MapComponent;
  selected: boolean = false;

  setSelected() {
    this.selected = true;
    this.map.panMapToNode(this.node);
  }
}
