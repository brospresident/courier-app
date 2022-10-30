import { Component, OnInit, Input } from '@angular/core';
import { RpcService } from 'src/app/services/rpc.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email: any | null = null;
  password: any | null = null;
  @Input() page: any | null = null;
  confirmPassword: any | null = null;
  first_name: any | null = null;
  last_name: any | null = null;
  constructor(private rpcService: RpcService,
              private cookieService: CookieService,
              private router: Router) { }

  ngOnInit(): void {
    if (!this.page) {
      this.page = 'login'
    }
  }

  switchPage(page: any) {
    this.page = page;
  }

  login() {
    if (!this.email || !this.password) return;

    let params = {
      email: this.email,
      password: this.password,
      query: 'select_client'
    }

    if (this.page == 'employee') {
      params.query = 'select_employee';
    }

    let self = this;
    this.rpcService.ask('auth.login', params, (err: any, res: any) => {
      if (err) {
        console.log(err);
        return;
      }
      res = res.result;
      self.cookieService.set('courier-auth', res.encoded);
      window.localStorage.setItem('courier-user', JSON.stringify(res));
      this.router.navigate(['/dashboard'], {
        queryParams: {
          'view': 'profile'
        }
      });
    });
  }

  register() {
    if (!this.email || !this.password || !this.confirmPassword || !this.first_name || !this.last_name) {
      return;
    }
    let params = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      query: 'insert_client'
    }

    if (this.password != this.confirmPassword) return;

    let self = this;
    this.rpcService.ask('auth.register', params, (err: any, res: any) => {
      if (err) {
        console.log(err);
        return;
      }
      self.cookieService.set('courier-auth', res.result.encoded);
      window.localStorage.setItem('courier-user', JSON.stringify(res.result));
      window.location.href = 'http://localhost:4200/dashboard';
    });
  }

}
