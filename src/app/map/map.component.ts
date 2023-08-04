import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Browser, Map, map, tileLayer, Marker, marker, Icon, icon, } from 'leaflet';

@Component({
    selector: 'my-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
  })
  export class MapComponent implements OnInit, AfterViewInit {
    currNodes: Array<MapNode> = [];
    

    @ViewChild('map')
    private mapContainer: ElementRef<HTMLElement>;
    private lefletMap: Map;

    private currentMarkers: Array<Marker>;
    private myIcon: Icon;

    constructor() {
      this.myIcon = icon(
        {
            iconUrl: '../../assets/maps-and-flags.png',
            iconSize: [50, 50],
            shadowSize: [0, 0]
          }
        );

        this.currentMarkers = new Array<Marker>();
     }
  
    ngOnInit() {
    }

    ngAfterViewInit() {
      const initialState = { lng: -98.35, lat: 37.50, zoom: 5 };
  
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

    refreshMarkers(nodes: Array<MapNode>) {
      this.currentMarkers.forEach(m => {
        this.lefletMap.removeLayer(m)
      })
      this.currentMarkers = []
      this.currNodes = nodes;
      this.currNodes.forEach(n => {
        let m = marker([n.latitude, n.longitude], {icon: this.myIcon});
        let toolTipText = `${n.city != '' ? n.city : '{missing_city_name}'}, ${n.state}<br />`;
        toolTipText += `Zip: ${n.zipCode}<br />`;
        toolTipText += `Average home value (ZHVI): ${n.zhvi.toFixed(0)}<br />`;
        if(n.tags != undefined && n.tags.length > 0) {
          toolTipText += 'Tags: ';
          n.tags?.forEach(t => toolTipText += t + ' ');
        }
        
        m.bindTooltip(toolTipText).openTooltip();
        this.currentMarkers.push(m);
        if(this.lefletMap != undefined){
          this.lefletMap.addLayer(m);
        }
      })
      if(this.lefletMap != undefined) {
        this.panMapToNode(this.currNodes[0]);
      }
    }

    panMapToNode(node: MapNode) {
      if(this.lefletMap !=  undefined) {
        this.lefletMap.setView([node.latitude, node.longitude], 6);
      }
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
