import { Component, Input } from '@angular/core';
import { MapNode } from '../map/map.component';

@Component({
  selector: 'app-listrow',
  templateUrl: './listrow.component.html',
  styleUrls: ['./listrow.component.css']
})
export class ListrowComponent {
  @Input() node: MapNode;
}
