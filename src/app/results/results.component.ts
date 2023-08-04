import { Component } from '@angular/core';
import { MapNode } from '../map/map.component';
import { Data } from '../data';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  // TempList: MapNode[];
  tempNode1 = new MapNode(
    '58196',
    '01001',
    'MA',
    'Agawam',
    'Hampden County',
    42.062368,
    -72.625754,
    326413.3806
  )
  tempNode2 = new MapNode(
    '58197',
    '01002',
    'MA',
    'Amherst',
    'Hampshire County',
    42.364061,
    -72.458739,
    518550.7761
  )
  tempNode3 = new MapNode(
    '58287',
    '01151',
    'MA',
    'Springfield',
    'Hampden County',
    42.15186,
    -72.509131,
    253327.8892
  )
  tempNode4 = new MapNode(
    '58291',
    '01201',
    'MA',
    'Pittsfield',
    'Berkshire County',
    42.448236,
    -73.273727,
    279937.0024
  )
  tempNode5 = new MapNode(
    '58294',
    '01220',
    'MA',
    'Adams',
    'Berkshire County',
    42.623799,
    -73.116736,
    239889.4614
  )
  tempNode6 = new MapNode(
    '58295',
    '01222',
    'MA',
    'Sheffield',
    'Berkshire County',
    42.058703,
    -73.322175,
    392268.2281
  )
  tempNode7 = new MapNode(
    '58296',
    '01223',
    'MA',
    'Becket',
    'Berkshire County',
    42.312225,
    -73.110124,
    359187.335
  )
  tempNode8 = new MapNode(
    '58297',
    '01224',
    'MA',
    'Lanesboro',
    'Berkshire County',
    42.513163,
    -73.195743,
    276415.3897
  )
  tempNode9 = new MapNode(
    '58298',
    '01225',
    'MA',
    'Cheshire',
    'Berkshire County',
    42.563401,
    -73.153335,
    329491.1922
  )
  tempNode10 = new MapNode(
    '58299',
    '01226',
    'MA',
    'Dalton',
    'Berkshire County',
    42.481119,
    -73.135073,
    310600.0704
  )
  tempNode11 = new MapNode(
    '58302',
    '01230',
    'MA',
    'Great Barrington',
    'Berkshire County',
    42.173192,
    -73.324283,
    605823.426
  )
  tempNode12 = new MapNode(
    '58303',
    '01235',
    'MA',
    'Hinsdale',
    'Berkshire County',
    42.425676,
    -73.063012,
    334427.386
  )
  TempList: MapNode[] = [this.tempNode1, this.tempNode2, this.tempNode3, this.tempNode4, this.tempNode5, this.tempNode6, this.tempNode7, this.tempNode8, this.tempNode9, this.tempNode10, this.tempNode11, this.tempNode12];
}
