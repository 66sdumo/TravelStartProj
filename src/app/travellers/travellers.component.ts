import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {TravellerService}  from './Shared/traveller.service';
import { HomeComponent } from './home/home.component';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {DatePicker2Component} from './date-picker2/date-picker2.component';
@Component({
  selector: 'app-travellers',
  templateUrl: './travellers.component.html',
  styleUrls: ['./travellers.component.css'],
  providers : [TravellerService]
})



export class TravellersComponent implements OnInit {

 private login: boolean = null;

  constructor(private travellerservice : TravellerService) {}

  ngOnInit() {

    
    if(JSON.parse(localStorage.getItem('login'))!=null){
      this.login =false;
    }else{
      this.login =true;
    }
}

onClear()
{
localStorage.clear();

window.location.reload();
}




}
