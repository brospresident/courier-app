import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private router: Router) { }

  // TODO: Functionalitatea din serviciul de angularjs $location just because it is better than angular approach
  // ref: https://docs.angularjs.org/api/ng/service/$location#search
  search(param = '', value = '') {
    if (!param && !value) {
      
    } else {

    }
  }
}
