import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private cookieService: CookieService,
                private router: Router,
                private accountService: AccountService) {}

    ngOnInit() {
        let authCookie = this.cookieService.get('courier-auth');
        if (!authCookie) {
            this.router.navigate(['/auth']);
        }

        if (authCookie) {
            let user = this.accountService.getUser();
            if (user.role == 'client') this.router.navigate(['/dashboard']);
            if (user.role == 'admin' || user.role == 'driver') this.router.navigate(['/admin']);
        }
    }
}
