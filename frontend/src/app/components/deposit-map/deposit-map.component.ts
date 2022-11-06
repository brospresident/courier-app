import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
import { AccountService } from 'src/app/services/account.service';
import { RpcService } from 'src/app/services/rpc.service';

@Component({
  selector: 'app-deposit-map',
  templateUrl: './deposit-map.component.html',
  styleUrls: ['./deposit-map.component.css']
})
export class DepositMapComponent implements AfterViewInit, OnInit {
  @Input() user: any;
  private map: L.Map | any;
  x_pos: any = 0;
  y_pos: any = 0;
  manager_email: any;
  schedule_start: any;
  schedule_end: any;
  constructor(private accountService: AccountService,
              private modalService: NgbModal,
              private rpcService: RpcService) {
  }

  ngOnInit() {
    this.user = this.accountService.getUser();
  }

  ngAfterViewInit(): void {
    this.initMap();
    let self = this;
    this.map.addEventListener('click', (event: any) => {
      if (self.user.role != 'admin') return;
      self.x_pos = event.latlng.lng;
      self.y_pos = event.latlng.lat;
    });
    this.getDepositData((err: any, res: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 44.43554951795808, 26.102464199066166 ],
      zoom: 16
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });		
  }

  saveDeposit() {
    let params = {
      x_pos: this.x_pos,
      y_pos: this.y_pos,
      email: this.manager_email,
      schedule_start: this.schedule_start,
      schedule_end: this.schedule_end,
      query: 'insert_deposit'
    };
    let self = this;
    this.rpcService.ask('deposits.insert_deposit', params, (err: any, res: any) => {
      if (err || res.error) {
        self.modalService.dismissAll();
      } else {
        self.modalService.dismissAll();
        self.ngOnInit();
      }
    });
  }

  getDepositData(cb: any) {
    this.rpcService.ask('deposits.get_all_deposits', {query: 'get_all_deposits'}, (err: any, res: any) => {
      if (err || res.error) {
        cb && cb(err || res.error, null);
        return;
      } else {
        console.log(res);
        cb && cb(null, res);
      }
    });
  }
}
