import { Component, OnInit } from '@angular/core';
import {TravellerService} from '../Shared/traveller.service';
import {Flight} from '../Shared/flight.model';
import {Airport} from '../Shared/airport.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  searchedFlight: Flight[];
 

  dept : any;
  deptDate : any;
  
   rturn:any;
  rturnDate: any;

  index : any;

 
 counter:any;

 notravellers : any;



  constructor(private  travellerservice :  TravellerService, private router : Router) {
   }

  ngOnInit()
  {

    this.travellerservice.getAirportList();
    this.counter = 12;

  }

 


  onSubmit(dept,deptDate,deptPort:Airport)
  {

    
    console.log(deptPort.airportName)
    this.dept = deptPort.airportName;
   // alert(this.dept);
    localStorage.setItem('departId',JSON.stringify(deptPort.airportId));
   // alert(localStorage.getItem('departId'));



   // alert(this.dept)
    console.log(this.dept);

    this.deptDate=(document.getElementById('deptDate') as HTMLInputElement).value;
    //alert(this.deptDate)
    console.log(this.deptDate);
   
   this.travellerservice.searchFlight(this.dept,this.deptDate)


   this.notravellers =(document.getElementById('noTravellers') as HTMLInputElement).value;
    console.log(this.notravellers);
    localStorage.setItem('noTravellers',(this.notravellers));
    console.log(localStorage.getItem('noTravellers'));
    
      this.router.navigate(['travellers/home/flight-view'])
      
    
  
  }




onReturn(rturn,rturnDate,retPort : Airport)
{

  console.log(retPort.airportName)

  localStorage.setItem('returnId',JSON.stringify(retPort.airportId));
  //alert(localStorage.getItem('returnId'));
 // alert(localStorage.getItem('profile'));

     this.rturn=retPort.airportName;
     console.log(this.rturn)
   //  alert(this.rturn);


     this.rturnDate=(document.getElementById('rturnDate')as HTMLInputElement).value;
     console.log(this.rturnDate)
     //alert(this.rturnDate);   
     
    this.travellerservice.searchReturn(this.rturn, this.rturnDate)

    

    this.router.navigate(['travellers/home/flight-view'])
    window.location.reload()

}
 


}

   