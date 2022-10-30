import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-deposit-map',
  templateUrl: './deposit-map.component.html',
  styleUrls: ['./deposit-map.component.css']
})
export class DepositMapComponent implements AfterViewInit, OnInit {
  @Input() user: any;
  private map: any | L.Map;
  

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.user = this.accountService.getUser();
  }

  ngAfterViewInit(): void {
    this.initMap();
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
    this.map.addEventListener('click', this.handleMapClick);
  }

  handleMapClick(event: any) {
    if (this.user?.role != 'admin') return;
    console.log(event);
  }

}
