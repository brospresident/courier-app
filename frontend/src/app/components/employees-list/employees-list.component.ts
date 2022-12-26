import { Component, Input, OnInit } from '@angular/core';
import { RpcService } from 'src/app/services/rpc.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  @Input() user: any;
  loading = false;
  employees: any;
  closeResult: any;
  first_name: any;
  last_name: any;
  email: any;
  phone_number: any;
  city: any;
  county: any;
  zip_code: any;
  street: any;
  wage: any;
  role: any;
  ssn: any;
  password: any;
  street_number: any;
  adding_employee: any = false;
  callback_info = {err: null, success: null} as any;
  constructor(private rpcService: RpcService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loading = true;
    let self = this;
    this.rpcService.ask('users.get_all_employees', {query: 'get_all_employees'}, (err: any, res: any) => {
      if (err || res.error) return;
      self.employees = res.result;
      console.log(self.employees);
      self.loading = false;
    });
  }

  open(content: any, employeeId: any) {
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.phone_number = '';
    this.city = '';
    this.county = '';
    this.zip_code = '';
    this.street = '';
    this.wage = '';
    this.role = '';
    if (employeeId != null) {
      this.adding_employee = false;
      let employee = this.employees[employeeId];
      this.first_name = employee.first_name;
      this.last_name = employee.last_name;
      this.email = employee.email;
      this.phone_number = employee.phone_number;
      this.city = employee.city;
      this.county = employee.county;
      this.zip_code = employee.zip_code;
      this.street = employee.street;
      this.wage = employee.wage;
      this.role = employee.role;
      this.street_number = employee.street_number;
    } else {
      this.adding_employee = true;
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
      this.adding_employee = false;
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  saveEmployeeData() {
    let params = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone_number: this.phone_number,
      city: this.city,
      county: this.county,
      zip_code: this.zip_code,
      password: this.password,
      street: this.street,
      wage: this.wage,
      role: this.role,
      street_number: this.street_number,
      ssn: this.ssn
    } as any;
    let method = 'users.add_employee';
    if (this.adding_employee) {
      params.query = 'add_employee'
    } else {
      params.query = 'update_employee';
      method = 'users.update_employee';
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
          self.adding_employee = false;
          self.callback_info = {err: null, success: null};
          self.ngOnInit();
        }, 3000);
      }
    });
    this.adding_employee = false;
  }
}
