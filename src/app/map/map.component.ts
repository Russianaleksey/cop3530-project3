import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Browser, Map, map, tileLayer, Marker, marker, Icon, icon, } from 'leaflet';
import {Data} from '../data';

@Component({
    selector: 'my-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
  })
  export class MapComponent implements OnInit, AfterViewInit {
    _currNodes: Array<MapNode> = [];
    get currNodes(): Array<MapNode> {
      return this._currNodes;
    };
    @Input() set currNodes(currentNodes: Array<MapNode>) {
      console.log(currentNodes)
      currentNodes.forEach(n => {
        this._currNodes.push(n);
      });
      this.refreshMarkers();
    }

    @ViewChild('map')
    private mapContainer: ElementRef<HTMLElement>;
    private lefletMap: Map;

    private currentMarkers: Array<Marker>;
    private myIcon: Icon;

    constructor() {
      this.myIcon = icon(
        {
            iconUrl: '../../assets/maps-and-flags.png',
            iconSize: [5, 5],
            shadowSize: [0, 0]
          }
        )
     }
  
    ngOnInit() {
      this.currentMarkers = new Array<Marker>();
    }

    ngAfterViewInit() {

      const initialState = { lng: 11, lat: 49, zoom: 4 };
  
      this.lefletMap = map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);
  
      const isRetina = Browser.retina;
      const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
      const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";
      
      tileLayer(isRetina ? retinaUrl : baseUrl, {
        attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
        apiKey: 'ca297971d1624f8f990e85b6d0d27118',
        maxZoom: 20,
        id: 'osm-bright',
      } as any).addTo(this.lefletMap);
    }

    refreshMarkers() {
      this.currentMarkers.forEach(m => {
        this.lefletMap.removeLayer(m)
      })
      this.currentMarkers = []
      this.currNodes.forEach(n => {
        let m = marker([n.latitude, n.longitude], {icon: this.myIcon});
        this.currentMarkers.push(m);
        m.addTo(this.lefletMap);
      })
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
    tags?: Array<string>;
    
    constructor(r: string, z: string, s: string, c: string, cou: string, lt: number, lo: number, zh: number, tagArray?: Array<string>) {
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
