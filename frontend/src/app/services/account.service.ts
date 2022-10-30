import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  getUser() {
    let user_obj = window.localStorage.getItem('courier-user') as any;
    user_obj = JSON.parse(user_obj);
    return user_obj;
  }
}
