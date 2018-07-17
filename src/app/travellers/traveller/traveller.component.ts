import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {TravellerService } from '../Shared/traveller.service';
import {ToastrService} from 'ngx-toastr'
import {Traveller} from  '../shared/traveller.model'
import { Router } from '@angular/router';
@Component({
  selector: 'app-traveller',
  templateUrl: './traveller.component.html',
  styleUrls: ['./traveller.component.css']
})
export class TravellerComponent implements OnInit {

User: Traveller;
roles  :any[];
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private travellerservice : TravellerService,private toastr : ToastrService, private router : Router) { }

  ngOnInit() {
    this.resetForm();
    this.travellerservice.getAllRoles().subscribe(
      (data : any) => {
        data.forEach(obj => obj.selected = false);
        this.roles = data;
      }
    );
    }
  
    resetForm(form? : NgForm){
    if(form != null)
      form.reset();
      this.User ={
        Username :'',
        Fname :'',
        Lname :'',
        Email :'',
        Title :'',
        Password :''
      }
      if(this.roles)
      this.roles.map(x => x.selected = false );
    }

 onSubmit(form : NgForm){
   var x = this.roles.filter(x => x.selected).map(y => y.Name);
  this.travellerservice.RegisterTraveller(form.value, x)
  .subscribe(data =>{
    
    this.resetForm(form);
    this.toastr.success('You have successfully registered','Register');
    this.router.navigate(['travellers/sign-in'])
   
    
  });
}

updateSelectedRoles(index)
{
  this.roles[index].selected = !this.roles[index].selected;
}

}
