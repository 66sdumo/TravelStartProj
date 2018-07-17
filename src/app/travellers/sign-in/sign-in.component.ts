import { Component, OnInit } from '@angular/core';
import {TravellerService } from '../Shared/traveller.service';
import {Traveller}from '../Shared/traveller.model';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

isLoginError : boolean = false;

Login : Traveller = new Traveller;
Username1 : any;
Password1 : any;




constructor(private travellerservice : TravellerService , private toastr : ToastrService, private router : Router) { }


  ngOnInit() {

  }

    onSubmit(Username,Password)
    {
      this.travellerservice.userAuthentication(Username,Password).subscribe((data : any)=> {
          localStorage.setItem('userToken',data.access_token);
          localStorage.setItem('userRoles',data.role);
          //console.log(localStorage.getItem('userRoles'));
          
            this.Username1 = (document.getElementById('username') as HTMLInputElement).value
            console.log(this.Username1);
            localStorage.setItem('Uname',this.Username1);
          //  alert(localStorage.getItem('Uname'));

            this.Password1 = (document.getElementById('password') as HTMLInputElement).value
            console.log(this.Password1);
          
            this.Login.Username =this.Username1;
            this.Login.Password=this.Password1;

            localStorage.setItem('login', JSON.stringify(this.Login)) ;
            

            this.router.navigate(['travellers/home'])
            window.location.reload();
      },
    (err : HttpErrorResponse)=> {
         
          this.toastr.error('Incorrect Username Or Password');
    });

    
    }



}
