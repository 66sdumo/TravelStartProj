import { Component, OnInit } from '@angular/core';
import { TravellerService } from '../Shared/traveller.service';
import {TravellerComponent} from '../traveller/traveller.component';
import {Traveller} from '../Shared/traveller.model'
import {DetailsService} from '../Shared/details.service'
import { Profile } from '../Shared/profile.model';
import { NgForm } from '@angular/forms';
import {ToastrService, Toast} from 'ngx-toastr';
import { Router } from '@angular/router';
import { Flight } from '../Shared/flight.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  time = {hour: 13, minute: 30};
 
admin : Flight;
  user;
  name;
  userId;

//For User View
  Id 
  Email 
  PasswordHash 
  SecurityStamp 
  Username
  Lname 
  Fname 
  Title
  Password 

  viewUser : boolean = false;
  viewFlight : boolean = true;

  date;


  constructor(private travellerservice : TravellerService, private detailservice : DetailsService, private toastr : ToastrService, private router : Router) { }

  ngOnInit() {


    this.resetForm();
    
    this.travellerservice.getAirportList();
  
  }


  onFind()
  {


    this.name = (document.getElementById('name') as HTMLInputElement).value;
   // console.log(this.name);
    this.travellerservice.userAdminList(this.name);
    //console.log(this.user[0].UserName);


    this.user =JSON.parse(localStorage.getItem('Admin')); 
    if(this.user == null)
    
    console.log(this.user);

    this.Id = this.user[0].Id;
    this.Email = this.user[0].Email;
    this.PasswordHash = this.user[0].PasswordHash;
    this.SecurityStamp = this.user[0].SecurityStamp;
    this.Username = this.user[0].UserName;
    this.Lname= this.user[0].Lname;
    this.Fname = this.user[0].Fname;
    this.Title = this.user[0].Title;
    this.Password = this.user[0].Password;

   
  }

  onSubmit(form : NgForm)
  {
  
      this.detailservice.putUser(this.user[0].Id,form.value)
      .subscribe(data => {
        this.toastr.info('Succesfully','Edit');
      });
    

  }

  onDelete()
  {
    this.userId = (document.getElementById('userId') as HTMLInputElement).value;
    console.log(this.userId);
  
    if(confirm('Are you sure you want to delete this user?') == true)
    {
      this.detailservice.deleteUser(this.userId)
      .subscribe(x => {
        this.toastr.warning("Deleted Successfully","Delete")
      })
    }
    }

    onUsers()
    {
      
     
        if(this.viewFlight = true)
        {
          this.viewFlight=false;
          this.viewUser = true;
        }
        
    }

    onAddFlight()
    {
   
      if(this.viewUser=true)
      {
        this.viewUser= false;
        this.viewFlight = true
      }
    
    }


    resetForm(form? : NgForm){
      if(form != null)
        form.reset();
        this.admin ={
          FlightId : null,
          Airport : '',
          Airline :'',
          Time :'',
          Price :null,
          Date :'',
          Class :''
        }
       
      }

    onFlight(form : NgForm){
      var body = {

        Airport :  (document.getElementById('airport') as HTMLInputElement).value,
        Airline :  (document.getElementById('airline') as HTMLInputElement).value,
        Time :  (document.getElementById('time') as HTMLInputElement).value,
        Price : (document.getElementById('price') as HTMLInputElement).value,
        Date : (document.getElementById('date') as HTMLInputElement).value,
        Class : (document.getElementById('class') as HTMLInputElement).value

      }
    
      
     this.detailservice.postFlight(body)
     .subscribe(data =>{
       
       this.resetForm(form);
       this.toastr.success('Flight Added');
      
      this.date = this.admin.Date;
      
       
     });
   }

}
