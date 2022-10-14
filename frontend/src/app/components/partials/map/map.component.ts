import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { icon, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {

  @Input()order!:Order; //CURRENT LATLAN WILL SET IN ORDER.
  @Input()readonly = false;
  //IF READONLY IS TRUE THEN WE NEED TO SHOWLOCATION LATLAN INSIDE THE ORDER OTHERWISE USE order.addressLatLan

  // FOR MARKER I WILL DEFINE THE TW0 PRIVATE FIELDS.
  private readonly MARKER_ZOOM_LEVEL = 16;
  // icon(): IS A PART OF LEAFLET.
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],//SHAP PART OF THE IMAGE THAT YOU WANT TO POINT IN MAKE.
  });

  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  @ViewChild('map', {static:true})mapRef!: ElementRef; //static true make it available inside ngOnInit()

  map!:Map; //type is leaflet

  currentMarker!:Marker;//WE USE IS BECAUSE WE DON'T WANT TO SHOW MORE THAN ONE MARKER ON THE SCREEN.

  constructor(private locationService: LocationService) { }

  ngOnChanges(): void {

    if(!this.order) return;//if there is no order means order is undefined or null then order

    this.initializeMap(); //this else portion is order is not null then initialize the map

    // THIS CHECK IF READONLY TRUE AND ADDRESS;AT;AN HAS VALUE THEN CALL A FUNCTION THAT SHOW DATA ON MAP.
    if(this.readonly && this.addressLatLng){
      this.showLocationOnReadonlyMode();
    }
  }

  showLocationOnReadonlyMode() {
    // HERE WE HAVE TWO THINGS IN THIS FUNCTION FIRST,SHOW THE MARKERS ON ORDER LOCATION AND SECOND DISABLING EVERYTHING RELATED TO THE MAP.
    const m = this.map;

    this.setMarker(this.addressLatLng); //THIS WILL SET THE MARKER FROM GET LATLAN FROM ORDER

    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);//THIS WILL MOVE THE VIEW OF THE MAP ON THE LOCATION OF THE MAP.

    // NOW WE DISABLE ALL THE PROPERTIES OF MAP.
    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');//CHANGE MARKER BY CLICK
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  initializeMap(){
    if(this.map) return; //IF MAP ALREADY INITIALIZED THEN JUST RETURN.


    // map(ELEMENT,OPTIONS): THIS IS USED FOR CREATING THE MAP.
    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false //IT WILL NOT SHOW LEAFLET ON BOTTOM RIGHT OF THE MAP.
    }).setView(this.DEFAULT_LATLNG, 1);//WHERE IT SHOW THE DEFAULT LOCATION.setView(DEFAULT LOCATION,ZOOM LEVEL)

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);//HOW WE WANT TO SHOW MAP.IT IS STYLE LAYER SYSTEM OF
    // OSM(OPEN STREET MAP). IT FREE OF CHARGE.

    this.map.on('click', (e:LeafletMouseEvent) => {//THIS IS FOR WHEN WE CLICK ON MAP THEN MARKER WILL SHOW LOCATION & MOVE THERE.
      this.setMarker(e.latlng);
    });
  }

  findMyLocation(){
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL)
        this.setMarker(latlng)
      }
    });

  }

  setMarker(latlng:LatLngExpression){ // type LatLngExpression =LatLan|LatLangLiteral|

    this.addressLatLng = latlng as LatLng; //EQUAVILENT IS :latlng=this.addressLang();
    //IT COULD GET THE VALUE FORM SET ADDRESS METHOD.
    // THIS WILL GET THE VALUE AS EQUAL SIGN INSTEAD OF CALLING THE FUNCTION.

    if(this.currentMarker)//THIS CHECK IF CURRENT MARKER IS ALREADY AVAILABLE THEN SET LATLAN()
    {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    // WHEN CURRENT MARKER IS NOT AVAILABLE.marker(LATLAN,OPTIONS); THIS IS LEAFLET FUNCTION.
    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);


    // THIS WILL GET CURRENT MARKER LOCATION AFTER DRAGGING THE MARKER ON MAP.
    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();//getLatLng():THIS FUNCTION INSIDE LEAFLET
    });

  }


  set addressLatLng(latlng: LatLng){
     //THE ORDER LATLAN VALUE IS COMING FROM THE SERVER IS TYPE STRING AND TO TOFIXED IS ONLY AVAILABLE FOR NUMBER SO WE RETURN HERE.
    if(!latlng.lat.toFixed) return;//THIS IS CALLED WHEN TOfIXED IS NOT AVAILABLE THEN JUST RETURN.

    latlng.lat = parseFloat(latlng.lat.toFixed(8));//I SET 8 FLOATING POINT BECAUSE MONGODB WILL NO ACCEPT MORE THAN 8 FLOAT POINT.
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng(){
    return this.order.addressLatLng!;//this will give value of LatLan from the order
  }
}
