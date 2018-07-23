import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {TravellerService } from '../../Shared/traveller.service';
import {ToastrService} from 'ngx-toastr';
import { TravellerDetails } from '../../Shared/traveller-details.model';
import { DetailsService } from '../../Shared/details.service';
import { Router } from '@angular/router';
import { Flight } from '../../Shared/flight.model';
import { Input } from '@angular/compiler/src/core';
import { Seat } from '../../Shared/seat.model';
import {Profile} from '../../Shared/profile.model';


@Component({
  selector: 'app-traveller-info',
  templateUrl: './traveller-info.component.html',
  styleUrls: ['./traveller-info.component.css']
})
export class TravellerInfoComponent implements OnInit {

  

  Title :any;
  Fname :any;
  Surname :any;
  Email :any;
  DOB :any;

  det : TravellerDetails;

 flytDep : Flight = new Flight;
  retFlyt : Flight = new Flight;
  
  tot : any;
  numTrav : any;
  counter : any[];

TravDetails =new Array();

count = 0;
                        

EmailTitle: any;
EmailFname: any;
EmailSurname: any;
Emailemail: any;

control : number=0;
range;
isTrue : boolean = false;


left = 1;
middle =2;
right =3;

left1 :boolean =false;
middle1 :boolean =false;
right1 :boolean =false;

sitStore;
sitNo : TravellerDetails = new TravellerDetails;

uname;
userId;

IdTrav;
IdCntct;

ProfileObj;
userid;
airportidDept;
airportidRet;


departId;
returnId;

emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

RefNo;


userid1 : Profile;
depFlightId : Flight;
retFlightId : Flight;
NumTrav;


  constructor(private detailservice : DetailsService,private travellerservice :TravellerService, private toastr : ToastrService, private router : Router) { }

  

  ngOnInit() {


    this.resetForm();
    this.reset();

    this.flytDep= JSON.parse(localStorage.getItem('selectedDep'));
    this.retFlyt= JSON.parse(localStorage.getItem('selectedRet'));
    this.tot= JSON.parse(localStorage.getItem('totalAmount'));
 


    this.numTrav =localStorage.getItem('noTravellers');

    
     this.range = this.numTrav;
    // console.log(this.range);
    

     this.uname = localStorage.getItem('Uname');
    // alert(this.uname);
     this.travellerservice.userList(this.uname);

     this.userId = JSON.parse(localStorage.getItem('profile'));
     console.log(localStorage.getItem('profile'));

            if ( localStorage.getItem('profile') == null )
            {
              window.location.reload();
            }
         


    // console.log(this.userId[0].UserName);
     this.IdTrav = this.userId[0].Id;
     this.IdCntct =this.userId[0].Id;


    /////Record
     this.userid1=JSON.parse( localStorage.getItem('profile'));
     this.depFlightId = JSON.parse(localStorage.getItem('selectedDep'));
     this.retFlightId = JSON.parse(localStorage.getItem('selectedRet'));
     this.NumTrav = localStorage.getItem('noTravellers');
     this.RefNo = localStorage.getItem('RefNo');

    }


    
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

   
    
  
    

    resetForm(form? : NgForm){
    if(form != null)
      form.reset();
       
      this.detailservice.trav ={
        TravellerID :null,
        Title:'',
        Fname :'',
        Surname :'',
        Email :'',
        DOB :'',   
        sitNo :''
      }
    }


  onSubmit(form : NgForm )
  {


    this.detailservice.postDetails(form.value)
    .subscribe(data  =>{
 
      this.TravDetails.push(',Traveller '+ ++this.count+',' +this.detailservice.trav.Title+' '+this.detailservice.trav.Surname +' '+this.detailservice.trav.Fname+' '+this.detailservice.trav.Email);

     

        localStorage.setItem('TravDetails',JSON.stringify(this.TravDetails));
       
      // console.log( localStorage.getItem('TravDetails'));


        this.resetForm(form);
      this.toastr.success('Successful','Travellers Details');
    
    });

    this.control++;
   // console.log(this.control,this.range)
    this.numTrav = this.numTrav - 1;
    if(this.control == this.range)
    {
      this.isTrue = true;
     
    }
  }

  reset(form? : NgForm){
    if(form != null)
      form.reset();
      this.detailservice.cntcts ={
        Title:'',
        Fname :'',
        Surname :'',
        Email :'',
        DialCode :null,
        MobileNo:null
      }
    }


  submit(form : NgForm)
  {
    this.detailservice.postContacts(form.value)
    .subscribe(data => {
      this.reset(form);
      this.toastr.success('Successful','Contact Details');
    this.router.navigate(['travellers/home/payment'])

    if(this.toastr.success)
    {
     
      this.uname = localStorage.getItem('Uname');
  
       this.travellerservice.userList(this.uname);

       this.detailservice.getRef();


     this.ProfileObj = JSON.parse(localStorage.getItem('profile'));
     this.userid = this.ProfileObj[0].Id;
     // alert(this.flytDep.FlightId)
       this.departId=this.flytDep.FlightId;
       this.returnId=this.retFlyt.FlightId;

       this.detailservice.postUSerFlight(this.userid,this.departId)
       .subscribe(data => {
        
         this.toastr.success('Successful','Depart Flight');
   
         if(this.toastr.success)
         {
           this.detailservice.postUSerFlight(this.userid,this.returnId)
             .subscribe(data => {
              this.toastr.success('Successful','Return Flight');
              });

              /////Record
              var body = {
    
                userId :this.userid1[0].Id,
                deptFlightId : this.depFlightId.FlightId,
                retFlightId : this.retFlightId.FlightId,
                NumTrav :this.NumTrav,
                Ref : this.RefNo
               }
          
               this.detailservice.postRecord(body)
               .subscribe(data => {
               
                this.toastr.success('Successful','Record');
             
              });
           
         }
      
       });
       


    }
    
    });
  }
 
  onClick()
  {
      //E for email

    this.EmailTitle= (document.getElementById('Etitle') as HTMLInputElement).value;
    this.EmailFname= (document.getElementById('EFname') as HTMLInputElement).value;
    this.EmailSurname= (document.getElementById('ESurname') as HTMLInputElement).value;
    this.Emailemail= (document.getElementById('Eemail') as HTMLInputElement).value;
    
    localStorage.setItem('ET', JSON.stringify(this.EmailTitle)) ;
    localStorage.setItem('EF', JSON.stringify(this.EmailFname)) ;
    localStorage.setItem('ES', JSON.stringify(this.EmailSurname)) ;
    localStorage.setItem('EE', JSON.stringify(this.Emailemail)) ;
    


    this.ProfileObj = JSON.parse(localStorage.getItem('profile'));
    this.userid = this.ProfileObj[0].Id;
    this.airportidDept=JSON.parse(localStorage.getItem('returnId'));
    this.airportidRet=JSON.parse(localStorage.getItem('departId'));

 
    this.detailservice.postUSerAirport(this.userid,this.airportidDept)
    .subscribe(data => {
     
      this.toastr.success('Successful','Depart');

      if(this.toastr.success)
      {
        this.detailservice.postUSerAirport(this.userid,this.airportidRet)
    .subscribe(data => {
     
      this.toastr.success('Successful','Return');
   
    });
        
      }
   
    });
    

    
    
  }




//Seat Sides====================

  onLeft()
  {
   
   
   this.travellerservice.getSeat(this.left);
  this.sitNo.sitNo = JSON.parse(localStorage.getItem('Seats1'));
  this.IdTrav = this.userId[0].Id;


 // alert(this.IdTrav);
 

  
  }

  onMiddle()
  {
   
   this.travellerservice.getSeat(this.middle);
   this.sitNo.sitNo = JSON.parse(localStorage.getItem('Seats2'));
   this.IdTrav = this.userId[0].Id;
  }

  onRight()
  {
 
   this.travellerservice.getSeat(this.right);
   this.sitNo.sitNo = JSON.parse(localStorage.getItem('Seats3'));
   this.IdTrav = this.userId[0].Id;
  
  }



}
