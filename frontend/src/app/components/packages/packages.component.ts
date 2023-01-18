import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { RpcService } from 'src/app/services/rpc.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  view: any;
  senderFormControl: any;
  receiverFormControl: any;
  weightFormControl: any;
  package_data: any;
  date_picker: any;
  date: any;
  packages: any;
  loading: any;
  user: any;
  query: string = 'load_all_packages';

  constructor(private route: ActivatedRoute,
              private rpcService: RpcService,
              private accountService: AccountService) { }

  ngOnInit(): void {
    let self = this;
    this.route.queryParams.subscribe((params: any) => {
      self.view = params['view'];
    });

    this.user = this.accountService.getUser();

    this.senderFormControl = new FormControl('', [Validators.required, Validators.email]);
    this.receiverFormControl = new FormControl('', [Validators.required, Validators.email]);
    this.weightFormControl = new FormControl(0, []);
    this.package_data = {};

    if (this.view == 'packages') {
      // this.loading = true;
    } 
  }

  findClient() {
    let self = this;
    this.package_data = {};
    this.rpcService.ask('users.get_user', {
      email: self.senderFormControl.value,
      query: 'select_client'
    }, (err: any, response: any) => {
      console.log(response);
      if (err || response.error) {
        this.package_data.error = 'There was a problem fetching receiver. Make sure the email is correct and try again later.'
        return;
      } 
      this.package_data.receiver = response.result;
      console.log(this.package_data);
    });
  }

  addPackage() {
    let self = this;
    this.rpcService.ask('packages.insert_package', {
      receiver_email: self.receiverFormControl.value,
      sender_email: self.senderFormControl.value,
      cost: self.getTotalCost(),
      weight: self.weightFormControl.value,
      date_added: self.formatDate(),
      query: 'insert_package'
    }, (err: any, res: any) => {
      if (err) {
        console.log(err);
        return;
      }

      if (res.error) {
        self.package_data.error = res.error;
      } 

      if (res.result) {
        self.package_data.result = res.result;
      }

      setTimeout(() => {
        self.package_data = {};
      }, 3000);
    });
  }

  loadPackages() {
    if (this.view != 'packages') return;

    let self = this;
    this.rpcService.ask('packages.load_packages', {
      query: self.query
    }, (err: any, result: any) => {
      if (err) {
        console.log(err);
        return;
      }

      self.packages = result.result;
      self.loading = false;
    });
  }

  getTotalCost() {
    let weight = this.weightFormControl.value;
    if (!weight) return;

    if (weight > 100) return weight * 10;

    return weight * 3.75;
  }

  formatDate() {
    console.log(this.date_picker);
    let year = this.date_picker.year;
    let month = this.date_picker.month;
    let day = this.date_picker.day;

    return `${year}-${month}-${day}`;
  }

  changeOption(id: any) {
    
  }

}
