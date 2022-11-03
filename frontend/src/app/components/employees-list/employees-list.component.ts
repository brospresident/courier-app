import { Component, Input, OnInit } from '@angular/core';
import { RpcService } from 'src/app/services/rpc.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  @Input() user: any;
  loading = false;
  employees: any;
  constructor(private rpcService: RpcService) { }

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

}
