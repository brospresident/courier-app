import { Component, Input, OnInit } from '@angular/core';
import { RpcService } from 'src/app/services/rpc.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() user: any;
  user_data: any = {} as any;
  callback_info = {err: null, result: null};
  constructor(private rpcService: RpcService) { }

  ngOnInit(): void {
    let params = {
      email: this.user.email,
      query: 'select_client'
    };

    let self = this;
    this.rpcService.ask('users.get_user', params, (err: any, res: any) => {
      res = res.result;
      self.user_data = res;
    });
  }

  saveClientInfo() {
    let params = {
      email: this.user_data.email,
      phone_number: this.user_data.phone_number,
      city: this.user_data.city,
      zip_code: this.user_data.zip_code,
      street: this.user_data.street,
      street_number: this.user_data.street_number,
      county: this.user_data.county,
      query: 'update_client_personal'
    };

    console.log(params);

    let self = this;
    this.rpcService.ask('users.update_client', params, (err: any, res: any) => {
      if (err || res.error) {
        self.callback_info.err = err || res.error;
      }

      if (res.result) {
        self.callback_info.result = res.result.message;
      }

      setTimeout(() => {
        self.callback_info = {err: null, result: null};
      }, 3000);
    });
  }

  handleViewChange(view: any) {

  }

}
