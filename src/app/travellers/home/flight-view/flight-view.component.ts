import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home.component';
import { TravellerService } from '../../Shared/traveller.service';
import { Flight } from '../../Shared/flight.model';
import { Router } from '@angular/router';
import { Seat } from '../../Shared/seat.model';

@Component({
  selector: 'app-flight-view',
  templateUrl: './flight-view.component.html',
  styleUrls: ['./flight-view.component.css']
})
export class FlightViewComponent implements OnInit {

 private result: Flight = new Flight;

 private  selected : Flight = new Flight;

 totAmnt :any;

view : boolean = false;
amnt;
returnFlight :Flight[];
viewresult :Flight[];


numTrav;

sits : Seat = new Seat;

save: any[] = new Array;

  constructor(private travellerservice: TravellerService, private router : Router) { }

  ngOnInit() {

    this.returnFlight = JSON.parse(localStorage.getItem('returnFlight'));

    this.viewresult = JSON.parse(localStorage.getItem('viewresult'));
 
    this.numTrav = localStorage.getItem('noTravellers');
    this.sits =JSON.parse( localStorage.getItem('Seats'));
    console.log(this.sits);
  }

  
  depSelect(result){
    this.result = result;
    console.log(this.result);
    localStorage.setItem('selectedDep', JSON.stringify(this.result)); 
    console.log(localStorage.getItem('selectedDep'));
  }

  retSelect(selected){
    this.selected = selected;
    console.log(this.selected);
    localStorage.setItem('selectedRet', JSON.stringify(this.selected));
    console.log(localStorage.getItem('selectedRet'));
  }


  
    getDepPrice(depPrice,retPrice)
    {
        depPrice= parseInt((document.getElementById('depPrice') as HTMLInputElement).textContent);
        console.log(depPrice);

        retPrice= parseInt((document.getElementById('retPrice') as HTMLInputElement).textContent);
        console.log(retPrice);
       
    }


   onContinue()
   {
    this.router.navigate(['travellers/home/traveller-info'])
    window.location.reload();
   }

   onView()
   {
    this.amnt =(this.result.Price + this.selected.Price)*this.numTrav;
    localStorage.setItem('totalAmount',JSON.stringify(this.amnt));
     this.view =true;
   }

}
