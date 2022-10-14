import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  // FOR FINDING THE DEFAULT LOCATION OF USER WE CAN USE JAVASCRIPT NAVIGATOR.
  getCurrentLocation(): Observable<LatLngLiteral>{

    return new Observable((observer) => {
      if(!navigator.geolocation) return; //IF BROWSER IS NOT SUPPORTING THE GEOLOCATION THEN IT WILL RETURN.

      return navigator.geolocation.getCurrentPosition(//WHEN BROWSER SUPPORT GEOLOCATION
        (pos) => {//SUCCESS CALLBACK
          observer.next({
            // THIS PART IS COMING FROM THE JAVASCRIPT:WE JUST WRAPPING IN OBSERVABLE
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (error) => {//ERROR CALL BACK
          observer.error(error);
        }

      );

    });

  }
}
