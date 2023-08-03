import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Browser, Map, map, tileLayer, marker, icon, } from 'leaflet';
import {Data} from '../data';

@Component({
    selector: 'my-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
  })
  export class MapComponent implements OnInit, AfterViewInit {
  
    @ViewChild('map')
    private mapContainer: ElementRef<HTMLElement>;
    private nodes: Array<MapNode>;
    constructor() {
      this.nodes = Data.getData();
     }
  
    ngOnInit() {
    }
  
    ngAfterViewInit() {

      const initialState = { lng: 11, lat: 49, zoom: 4 };
  
      const lefletMap: Map = map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);
  
      const isRetina = Browser.retina;
      const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
      const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";
      
      tileLayer(isRetina ? retinaUrl : baseUrl, {
        attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
        apiKey: 'ca297971d1624f8f990e85b6d0d27118',
        maxZoom: 20,
        id: 'osm-bright',
      } as any).addTo(lefletMap);

      let counter: number = 0;
      let myIcon = icon(
        {
          iconUrl: '../../assets/maps-and-flags.png',
          iconSize: [5, 5],
          shadowSize: [0, 0]
        }
      )
      this.nodes.forEach(n => {
        if(counter % 25000 == 0) {
          marker([n.latitude, n.longitude], {icon: myIcon}).addTo(lefletMap);
        }
        counter++;
      })
      //marker([51.5, -0.09]).addTo(lefletMap);
      //marker([40.68295, -73.97559]).addTo(lefletMap);
    }
  }

  export class MapNode {
    regionId: string;
    zipCode: string;
    state: string;
    city: string;
    county: string;
    latitude: number;
    longitude: number;
    zhvi: number;
    
    constructor(r: string, z: string, s: string, c: string, cou: string, lt: number, lo: number, zh: number) {
      this.regionId = r;
      this.zipCode = z;
      this.city = c;
      this.state = s;
      this.latitude = lt;
      this.longitude = lo;
      this.zhvi = zh;
      this.county = cou;
    }
  }