import { Component, Input, OnInit } from '@angular/core';
import { RpcService } from 'src/app/services/rpc.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  @Input() user: any;
  loading = false;
  vehicles: any;
  closeResult: any;
  model: any;
  number_plate: any;
  driver_email: any;
  adding_vehicle: any = false;
  callback_info = {err: null, success: null} as any;
  constructor(private rpcService: RpcService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loading = true;
    let self = this;
    this.rpcService.ask('vehicles.get_all_vehicles', {query: 'get_all_vehicles'}, (err: any, res: any) => {
      if (err || res.error) return;
      self.vehicles = res.result;
      console.log(self.vehicles);
      self.loading = false;
    });
  }

  open(content: any, vehicleId: any) {
    this.model = '';
    this.number_plate = '';
    this.driver_email = '';

    if (this.adding_vehicle) {
      let veh = this.vehicles[vehicleId];
      this.model = veh.model;
      this.number_plate = veh.number_plate;
    }
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  saveVehicleData() {
    let params = {
      
    } as any;
    let method = 'vehicles.add_vehicle';
    if (this.adding_vehicle) {
      params.query = 'add_vehicle'
    } else {
      params.query = 'update_vehicle';
      method = 'vehicles.update_vehicle';
    }
    let self = this;
    this.rpcService.ask(method, params, (err: any, res: any) => {
      if (err || res.error) {
        self.callback_info.err = res.error;
        setTimeout(() => {
          self.callback_info = {err: null, success: null};
        }, 3000);
      } else {
        self.callback_info.success = res.result.message;
        setTimeout(() => {
          self.modalService.dismissAll();
          self.adding_vehicle = false;
          self.callback_info = {err: null, success: null};
          self.ngOnInit();
        }, 3000);
      }
    });
    this.adding_vehicle = false;
  }
}
