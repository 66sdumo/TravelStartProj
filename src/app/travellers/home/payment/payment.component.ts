import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../Shared/details.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import { TravellerService } from '../../Shared/traveller.service';
import {Flight} from '../../Shared/flight.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  title :any =JSON.parse(localStorage.getItem('ET'));
  lname :any =JSON.parse(localStorage.getItem('ES'));
  fname :any =JSON.parse(localStorage.getItem('EF'));
  email :any =JSON.parse(localStorage.getItem('EE'));

depart: Flight = new Flight;

return : Flight = new Flight;

type;

userId;

  constructor( private detailservice : DetailsService, private toastr : ToastrService, private router : Router, travellerservice : TravellerService ) { }

  ngOnInit() {
    this.reset();
    this.depart = JSON.parse(localStorage.getItem('selectedDep'));

    this.return = JSON.parse(localStorage.getItem('selectedRet'));
  
    this.userId = JSON.parse(localStorage.getItem('profile'));
  }



  reset(form? : NgForm){
    if(form != null)
      form.reset();
      this.detailservice.pay={
        paymentID :null,
        Cardno : '',
        Expiry: '',
        CVC :'',
        Address1 :'',
        Address2 :'',
        Postal :'',
        City :'',
        Dialcode :'',
        Contactno :''
      }
    }


  onSubmit(form : NgForm)
  {
    this.detailservice.postPayment(form.value)
    .subscribe(data => {
      this.reset(form);
      this.toastr.success('Recieved','Check email.!');
    this.router.navigate(['travellers/home/payment'])
    
    });
   
  }

  onClick()
  {
 
   this.detailservice.getEmail(this.title,this.fname,this.lname,this.email,this.depart.Airport,this.depart.Airline,this.depart.Date,this.depart.Time,this.depart.Class
    ,this.return.Airport,this.return.Airline,this.return.Date,this.return.Time,this.return.Class); 
    console.log(this.depart.Airport)
    console.log(this.depart.Airline)
    console.log(this.depart.Time)
    console.log(this.depart.Date)
    
  }

  onClick1()
  {
      this.type="Pay instantly & securely with your 3D Secure Credit Card";
  }


  onClick2()
  {
      this.type="Pay instantly & securely with your 3D Secure Cheque Card";
  }

  

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  keyPressCardNo(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressCvc(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
