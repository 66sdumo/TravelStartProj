import { Injectable } from '@angular/core';
import {Http, Response,Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Traveller} from './traveller.model';
import { TravellerDetails } from './traveller-details.model';

import { TravellerComponent } from '../traveller/traveller.component';
import {Flight} from '../Shared/flight.model';
import {HomeComponent} from '../home/home.component';
import {TravellerInfoComponent} from '../home/traveller-info/traveller-info.component';
import {Profile} from '../Shared/profile.model';
import {Seat} from '../Shared/seat.model';
import { Airport } from './airport.model';

@Injectable()
export class TravellerService {

travellerList : Traveller[];
profList : Profile[];

adminList : Profile[];


SelectedFlight : Flight;
FlightList : Flight[];
getFlight : Flight;
airportList : Airport[];

admin : Flight;

flightResult : Flight;
viewresult :Flight[];

returnFlight:Flight[];

seatNo :Seat[];
save;





  readonly rootUrl ='http://localhost:52936';
  constructor(private http : HttpClient, private Http : Http) { }


RegisterTraveller(user : Traveller, roles : string[]){
const body = {
  Username : user.Username,
  Lname : user.Lname,
  Fname : user.Fname,
  Email : user.Email,   
  Title : user.Title,
  Password : user.Password,
  Roles : roles
  }
  var reqheader = new HttpHeaders({'No-Auth': 'True'});
  return this.http.post(this.rootUrl + '/api/User/Register',body);
};








getAllRoles()
{
  var reqheader = new HttpHeaders({'No-Auth': 'True'});
  return this.http.get(this.rootUrl + '/api/GetAllRoles', {headers : reqheader});
}

roleMatch(allowedRoles) : boolean {
  var isMatch = false;
  var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
  allowedRoles.forEach(element => {
    if (userRoles.indexOf(element) > -1) {
      isMatch = true;
      return false;
    }
  });
  return isMatch;
}

userAuthentication(Username,Password)
{
  var data = "Username="+Username+"&Password="+Password+"&grant_type=password";
  var reqheader = new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded'});
  return this.http.post(this.rootUrl+'/token',data,{headers: reqheader});
}


getUserClaims()
{
  return this.http.get(this.rootUrl+'/api/GetUserClaims'
  ,{headers : new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
}





userList(Uname)
{
 var data= "Uname="+Uname;
  return this.Http.get(this.rootUrl+'/api/Users?'+data)
  .map((data : Response ) => {
    return data.json() as Profile[];
  }).toPromise().then(x => {
    this.profList = x;
    localStorage.setItem('profile',JSON.stringify(this.profList));
   console.log(localStorage.getItem('profile'));
  });
  
} 

userAdminList(Uname)
{
 var data= "Uname="+Uname;
  return this.Http.get(this.rootUrl+'/api/Users?'+data)
  .map((data : Response ) => {
    return data.json() as Profile[];
  }).toPromise().then(x => {
    this.adminList = x;
    localStorage.setItem('Admin',JSON.stringify(this.adminList));
   // alert(localStorage.getItem('Admin'));
  });
  
} 


getAirportList()
{
  this.Http.get(this.rootUrl+'/api/Airports')
  .map((data : Response) => {
    return data.json() as Airport[];
  }).toPromise().then(x => {
    this.airportList = x;
   
  })
}

getFlightList()
{
  this.Http.get(this.rootUrl+'/api/Flights')
  .map((data : Response) => {
    return data.json() as Flight[];
  }).toPromise().then(x => {
    this.FlightList = x;
   
  })
}

searchFlight(dept,deptDate)
{
 var data= "dept="+dept+"&deptDate="+deptDate;
  return this.Http.get(this.rootUrl+'/api/Flights?'+data)
  .map((data : Response ) => {
    return data.json() as Flight[];
  }).toPromise().then(x => {
    this.viewresult = x;
    localStorage.setItem('viewresult',JSON.stringify(this.viewresult));
    alert(localStorage.getItem('viewresult'));
  })
}






searchReturn(rturn,rturnDate)
{
 var data= "rturn="+rturn+"&rturnDate="+rturnDate;
  return this.Http.get(this.rootUrl+'/api/Flights?'+data)
  .map((data : Response ) => {
    return data.json() as Flight[];
  }).toPromise().then(x => {
    this.returnFlight = x;
    localStorage.setItem('returnFlight',JSON.stringify(this.returnFlight));
    alert(localStorage.getItem('returnFlight'));
  })
}

getSeat(sideNo)
  {

    var data= "sideNo="+sideNo;
    return this.Http.get(this.rootUrl+'/api/Seat?'+data)
    .map((data : Response ) => {
      return data.json() as Seat[];
    }).toPromise().then(x => {
     this.seatNo = x;
     if(sideNo == 1)
     {
     localStorage.setItem('Seats1',JSON.stringify(this.seatNo));
    // alert(this.seatNo);
     }else if(sideNo == 2)
     {
      localStorage.setItem('Seats2',JSON.stringify(this.seatNo));
     // alert(this.seatNo);
     }else if(sideNo == 3)
     {
      localStorage.setItem('Seats3',JSON.stringify(this.seatNo));
   //   alert(this.seatNo);
     }
    })

  };



}

