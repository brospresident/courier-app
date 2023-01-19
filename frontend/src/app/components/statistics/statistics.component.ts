import { Component, OnInit } from '@angular/core';
import { RpcService } from 'src/app/services/rpc.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  loading: any;
  data: any = {} as any;
  constructor(private rpcService: RpcService) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadData();
  }

  loadData() {
    let self = this;
    this.rpcService.ask('statistics.get_all_statistics', {}, (err: any, result: any) => {
      if (err) {
        console.log(err);
        return;
      }

      self.data = result.result;
      console.log(self.data);
      this.loading = false;
    });
  }

  keys() {
    return Object.keys(this.data).length;
  }

}
