import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  user: any;
  view: any = 'login';
  constructor(private accountService: AccountService,
              private router: Router,
              private locationService: LocationService) { }

  ngOnInit(): void {
    this.user = this.accountService.getUser();
    if (this.user && (this.user.role != 'admin' || this.user.role != 'driver')) {
      this.router.navigate(['/dashboard']);
    }

    if (!this.user) {
      this.view = 'login';
      this.locationService.search('view', this.view);
    } else {
      this.view = 'dashboard';
      this.locationService.search('view', this.view);
    }
  }

}
