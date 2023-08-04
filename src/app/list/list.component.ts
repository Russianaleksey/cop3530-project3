import { Component, Input } from '@angular/core';
import { MapNode } from '../map/map.component';

@Component({
  selector: 'app-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input() node: MapNode;

  
}


