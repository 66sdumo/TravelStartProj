import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngbd-datepicker-popup',
  templateUrl: './ngbd-datepicker-popup.component.html',
  styleUrls: ['./ngbd-datepicker-popup.component.css']
})
export class NgbdDatepickerPopupComponent implements OnInit {

  model;

  model2;

  time = {hour: 13, minute: 30};

  constructor() { }

  ngOnInit() {
  }

}
