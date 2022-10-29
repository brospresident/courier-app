import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RpcService {
  private url = 'http://localhost:6001/api'
  constructor() { }

  ask(endpoint: any, params: any, callback: any) {
    // body trebuie sa respecte fix structura asta, altfel not JSON-RPC
    // ref: https://www.jsonrpc.org/specification
    let body = {
      "jsonrpc": "2.0",
      "method": endpoint,
      "params": params,
      "id": "1"
    }

    axios({
      url: this.url,
      data: body,
      method: 'post'
    })
    .then(response => {
      if (response) {
        callback(null, response.data);
      }
    })
    .catch(err => {
      if (err) {
        callback(err, null);
      }
    });
  }
}
