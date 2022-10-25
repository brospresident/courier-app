import { Component, OnInit } from '@angular/core';
import { RpcService } from 'src/app/services/rpc.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email: any | null = null;
  password: any | null = null;
  page: any | null = null;
  constructor(private rpcService: RpcService) { }

  ngOnInit(): void {
    this.page = 'login';
  }

  login() {
    if (!this.email || !this.password) return;

    let params = {
      email: this.email,
      password: this.password
    }

    let self = this;
    this.rpcService.ask('auth.login', params, (err: any, res: any) => {
      
    });
  }

}
