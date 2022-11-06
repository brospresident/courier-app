import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  generatePopup(data: any) {
    return `
      <div>Manager Name: ${data.first_name} ${data.last_name}</div>
      <div>Schedule: ${data.schedule_start} - ${data.schedule_end}</div>
    `;
  }
}
