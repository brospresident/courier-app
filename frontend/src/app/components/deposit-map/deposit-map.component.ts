import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
import { AccountService } from 'src/app/services/account.service';
import { MarkerService } from 'src/app/services/marker.service';
import { RpcService } from 'src/app/services/rpc.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

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
  deposits_data: any;
  constructor(private accountService: AccountService,
              private modalService: NgbModal,
              private rpcService: RpcService,
              private markerService: MarkerService) {
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
    this.getDepositData();
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

  getDepositData() {
    let self = this;
    this.rpcService.ask('deposits.get_all_deposits', {query: 'get_all_deposits'}, (err: any, res: any) => {
      if (err || res?.error) {
        console.log(res?.err);
        console.log(err);
        self.deposits_data = [];
        return;
      } else {
        self.deposits_data = res.result;
        // self.markerService.generateMarker(self.deposits_data, self.map);
        for (const deposit of self.deposits_data) {
          const newMarker = L.marker([deposit.x_pos, deposit.y_pos]);
          newMarker.bindPopup(self.makePopUp(deposit));
          newMarker.addTo(self.map);
        }
        console.log(self.map);
      }
    });
  }

  makePopUp(data: any) {
    return `` +
      `<div>Manager Name: ${data.first_name} ${data.last_name}</div>` +
      `<div>Schedule: ${data.schedule_start} - ${data.schedule_end}</div>`;
  }
}
