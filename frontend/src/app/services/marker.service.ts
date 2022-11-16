import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private popupService: PopupService) { }

  // generateMarker(markerData: any, map: L.Map) {
  //   for (const m of markerData) {
  //     const newMarker = L.marker([m.x_pos, m.y_pos]);
  //     newMarker.addTo(map);
  //     console.log(map);
  //   }
  // }
}
