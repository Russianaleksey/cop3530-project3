import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Browser, Map, map, tileLayer, Marker, marker, Icon, icon } from 'leaflet';

@Component({
    selector: 'my-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
    currNodes: Array<MapNode> = [];

    //ViewChild decorator accesses map container element in the template
    @ViewChild('map')
    private mapContainer: ElementRef<HTMLElement>;
    private lefletMap: Map;

    private currentMarkers: Array<Marker>;
    private myIcon: Icon;

    constructor() {
        //defines the custom icon for markers
        this.myIcon = icon({
            iconUrl: '../../assets/maps-and-flags.png',
            iconSize: [50, 50],
            shadowSize: [0, 0]
        });

        this.currentMarkers = new Array<Marker>();
    }

    ngOnInit() {
    }

    //sets up the leaflet map and tile layer
    ngAfterViewInit() {
        const initialState = { lng: -98.35, lat: 37.50, zoom: 5 };

        //creates the Leaflet map and set the initial view
        this.lefletMap = map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);

        const isRetina = Browser.retina;
        const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
        const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";

        //adds the tile layer to the map for displaying the map tiles
        tileLayer(isRetina ? retinaUrl : baseUrl, {
            attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
            apiKey: 'ca297971d1624f8f990e85b6d0d27118',
            maxZoom: 20,
            id: 'osm-bright',
        } as any).addTo(this.lefletMap);
    }

    //refresh the markers on the map based on the given nodes data
    refreshMarkers(nodes: Array<MapNode>) {
        this.currentMarkers.forEach(m => {
            this.lefletMap.removeLayer(m)
        })
        this.currentMarkers = []
        this.currNodes = nodes;
        this.currNodes.forEach(n => {
            let m = marker([n.latitude, n.longitude], { icon: this.myIcon });
            let toolTipText = `<b>${n.city != '' ? n.city : '{missing_city_name}'}, ${n.state}</b><br />`;
            toolTipText += `Zip: ${n.zipCode}<br />`;
            toolTipText += `Average home value (ZHVI): ${n.zhvi.toFixed(0)}<br />`;
            if (n.tags != undefined && n.tags.length > 0) {
                toolTipText += '<div class=\'tag-container\'>Tags:</br> ';
                n.tags?.forEach(t => toolTipText += this.getTagMapping(t));
                toolTipText += '</div>';
            }

            m.bindTooltip(toolTipText).openTooltip();
            this.currentMarkers.push(m);
            if (this.lefletMap != undefined) {
                this.lefletMap.addLayer(m);
            }
        })
        if (this.lefletMap != undefined) {
            this.panMapToNode(this.currNodes[0]);
        }
    }

    //pan the map to the given node's location
    panMapToNode(node: MapNode) {
        if (this.lefletMap != undefined) {
            this.lefletMap.setView([node.latitude, node.longitude], 6);
        }
    }

    //helper function to generate HTML for tag mappings
    private getTagMapping(tag: string) {
        return `<span class='tag ${tag}'>${tag}</span><br/>`
    }
}

//defines the MapNode class to represent individual nodes with geographical data
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
        if (tagArray != undefined) {
            this.tags = tagArray;
        }
    }
}

