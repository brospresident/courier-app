import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private cookieService: CookieService,
                private router: Router) {}

    ngOnInit() {
        let authCookie = this.cookieService.get('courier-auth');
        if (!authCookie) {
            this.router.navigate(['/auth']);
        }
    }
}
