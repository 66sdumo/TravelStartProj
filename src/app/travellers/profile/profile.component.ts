import { Component, OnInit } from '@angular/core';
import { TravellerService } from '../Shared/traveller.service';
import {TravellerComponent} from '../traveller/traveller.component';
import {Traveller} from '../Shared/traveller.model'
import {DetailsService} from '../Shared/details.service'
import { Profile } from '../Shared/profile.model';
import { NgForm } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userClaims :any;
  claims: Traveller = new Traveller;

  profile: Profile = new Profile;
  prof1;
  prof = JSON.parse(localStorage.getItem('profile'));

  
  name:string =localStorage.getItem('Uname');
  
 


  constructor(private travellerservice :TravellerService, private detailservice : DetailsService, private toastr : ToastrService) { }

  ngOnInit() {
    this.travellerservice.getUserClaims().subscribe((data : any) => {
      this.userClaims = data;
      this.claims = this.userClaims;
     // console.log(this.claims);

     localStorage.setItem('userId',JSON.stringify(this.prof[0].Id));
   // alert(localStorage.getItem('userId'));

    });

  //alert(this.name);
   this.travellerservice.userList(this.name);
  
   if(this.prof ==null)
   {
     window.location.reload();
   }

  
   this.profile = this.prof;
   console.log(this.profile);


  console.log(this.prof[0].Id); 
  console.log(this.prof);
  console.log(this.prof[0].UserName);
  console.log(this.prof[0].Email);
  console.log(this.prof[0].Lname);
  console.log(this.prof[0].UserName);


  }

  onSubmit(form :NgForm)
  {
    this.detailservice.putUser(this.prof[0].Id,form.value)
    .subscribe(data => {
      this.toastr.info('Succesfully','Edit');
    });
  }

}
