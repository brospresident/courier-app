import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  search(param = '', value = '') {
    let query_params = this.router.getCurrentNavigation()?.extractedUrl.queryParams as any;
    if (!query_params) {
      query_params = {};
    }
    if (!param || !value) {
      return query_params;
    }
    let self = this;
    query_params[param] = value;
    this.router.navigate([], {
      relativeTo: self.activatedRoute,
      queryParams: query_params, 
      queryParamsHandling: 'merge'
    });
  }
}
