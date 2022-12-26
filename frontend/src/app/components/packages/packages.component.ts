import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { RpcService } from 'src/app/services/rpc.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  view: any;
  emailFormControl: any;
  package_data: any;
  constructor(private route: ActivatedRoute,
              private rpcService: RpcService) { }

  ngOnInit(): void {
    let self = this;
    this.route.queryParams.subscribe((params: any) => {
      self.view = params['view'];
    });

    this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    this.package_data = {};
  }

  findClient() {
    let self = this;
    this.package_data = {};
    this.rpcService.ask('users.get_user', {
      email: self.emailFormControl.value,
      query: 'select_client'
    }, (err: any, response: any) => {
      if (err || response.error) {
        this.package_data.error = 'There was a problem fetching receiver. Make sure the email is correct and try again later.'
        return;
      } 
      this.package_data.receiver = response;
      console.log(this.package_data);
    });
  }



}
