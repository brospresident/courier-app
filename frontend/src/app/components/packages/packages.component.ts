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
  packages1: any;
  packages2: any;
  loading: any;
  user: any;
  query: any = 'get_all_packages_without_driver';
  package_view = 'default';

  constructor(private route: ActivatedRoute,
              private rpcService: RpcService,
              private accountService: AccountService) { }

  ngOnInit(): void {
    let self = this;
    this.route.queryParams.subscribe((params: any) => {
      self.view = params['view'];
    });

    this.user = this.accountService.getUser();
    console.log(this.user);

    this.senderFormControl = new FormControl('', [Validators.required, Validators.email]);
    this.receiverFormControl = new FormControl('', [Validators.required, Validators.email]);
    this.weightFormControl = new FormControl(0, []);
    this.package_data = {};

    if (this.view == 'packages') {
      this.loading = true;
      this.loadPackages();
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

  buildLoadParams() {
    if (this.query != 'get_all_packages_with_driver' || this.query != 'get_all_packages_without_driver') {
      return {
        query: this.query,
        driver_email: this.accountService.getUser()['email']
      }
    }

    return {
      query: this.query
    }
  }

  loadPackages() {
    if (this.view != 'packages') return;

    let self = this;
    let params = this.buildLoadParams();
    console.log(params);
    this.rpcService.ask('packages.load_packages', params, (err: any, result: any) => {
      if (err) {
        console.log(err);
        return;
      }
      
      self.packages1 = result.result;
      for (const pack of self.packages1) {
        pack.date_added = pack.date_added.split('T')[0];
        if (pack.date_delivered) {
          pack.date_delivered = pack.date_delivered.split('T')[0];
        }
      }
      console.log(self.packages1);
      self.loading = false;
    });

    if (this.query == 'get_all_packages_without_driver') {
      this.query = 'get_all_packages_with_driver';

      this.rpcService.ask('packages.load_packages', {query: self.query}, (err: any, result: any) => {
        if (err) {
          console.log(err);
          return;
        }

        self.packages2 = result.result;
        for (const pack of self.packages2) {
          pack.date_added = pack.date_added.split('T')[0];
          if (pack.date_delivered) {
            pack.date_delivered = pack.date_delivered.split('T')[0];
          }
        }
        console.log(self.packages2);
      });
    }
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
    if (id == 0) {
      this.query = 'get_all_packages_without_driver';
      this.package_view = 'default';
    }

    if (id == 1) {
      this.query = 'get_all_packages_picked_by_a_driver';
      this.package_view = 'picked_by_me';
    }

    if (id == 2) {
      this.query = 'get_all_packages_delivered_by_a_driver';
      this.package_view = 'delivered_by_me';
    }
    return this.ngOnInit();
  }

  deletePackage(id: any) {
    let self = this;
    this.rpcService.ask('packages.delete_package', {query: 'delete_package', package_id: id}, (err: any, result: any) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }

  deliverPackage(id: any) {
    let self = this;
    let date = new Date();
    let date_delivered = new Date().toISOString().split('T')[0];

    console.log(date_delivered);
    let params = {
      new_status: 2,
      query: 'update_package_status',
      package_id: id,
      date_delivered: date_delivered
    };

    this.rpcService.ask('packages.update_package_status', params, (err: any, result: any) => {
      if (err) {
        console.log(err);
        return;
      }
      location.reload();
    });
  }

  pickPackage(id: any) {
    let self = this;
    let params = {
      new_status: 1,
      query: 'update_package_status',
      package_id: id,
      driver_email: this.user.email
    };

    this.rpcService.ask('packages.update_package_status', params, (err: any, result: any) => {
      if (err) {
        console.log(err);
        return;
      }
      location.reload();
    });
  }

}
