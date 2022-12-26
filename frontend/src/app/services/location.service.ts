import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RoutesRecognized} from '@angular/router';


// LEGACY -> should be removed in a new code refactor.
// not used in new features since 26.12.2022
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  search(param = '', value = '') {
    let query_params = this.getQueryParams();
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

  private getQueryParams() {
    let query_params = window.location.search as any;
    if (!query_params) return {};
    query_params = query_params.split('?')[1];
    query_params = query_params.split('&');
    let result = {} as any;
    for (let param of query_params) {
      param = param.split('=');
      result[param[0]] = param[1];
    }
    return result;
  }

}
