import { Component, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: any;
  view: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private cookieService: CookieService,
              private location: LocationService,
              private router: Router) {}

  ngOnInit() {
    let authCookie = this.cookieService.get('courier-auth');
    if (!authCookie) {
      this.router.navigate(['/auth']);
    }
    let user_obj = window.localStorage.getItem('courier-user') as any;
    user_obj = JSON.parse(user_obj);
    this.user = user_obj;
    this.location.search();
    // this.view = this.location.search()['view'];
  }

  logout() {
    window.localStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['/auth']);
  }

  changeView(view: any) {
    this.view = view;
    this.location.search('view', view);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['view'].currentValue != changes['view'].previousValue) {
      this.ngOnInit();
    }
  } 

}
