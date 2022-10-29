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

  saveUserInfo() {}

}
