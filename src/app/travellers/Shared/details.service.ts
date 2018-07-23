import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,RequestMethod } from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {TravellerDetails} from '../Shared/traveller-details.model';
import {Contacts} from '../Shared/contacts.model';
import { Flightpayment } from '../Shared/flightpayment.model';
import {PaymentComponent} from '../../travellers/home/payment/payment.component'
import {Profile} from '../Shared/profile.model';
import {Traveller} from '../Shared/traveller.model';
import {Flight} from '../Shared/flight.model';
import { Record} from '../Shared/record.model';

@Injectable()
export class DetailsService {

  trav : TravellerDetails;
  cntcts : Contacts;
  pay : Flightpayment;
 
  
  travdetails : TravellerDetails;
  travcontacts : Contacts;

  payFlight : Flightpayment;

  store: any[];



  readonly rootUrl ='http://localhost:52936/';
  constructor(private http : Http) { }



  postDetails(travdetails : TravellerDetails)
  {
    

    var body = JSON.stringify(travdetails);
    var headerOptions = new Headers({'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.http.post(this.rootUrl + 'api/Travellers',body,requestOptions).map(x => x.json());


  };

  postContacts(travcontacts : Contacts)
  {
      
  
      var body = JSON.stringify(travcontacts);
      var headerOptions = new Headers({'Content-Type': 'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
        return this.http.post(this.rootUrl + 'api/Contacts',body,requestOptions).map(x => x.json());
  
  
  };



  postPayment(payFlight :Flightpayment )
  {
      
  
      var body = JSON.stringify(payFlight);
      var headerOptions = new Headers({'Content-Type': 'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.http.post(this.rootUrl + 'api/FlightPayments',body,requestOptions).map(x => x.json());
  
  
  };

  
  getEmail(TravDetails: any[],title,fname,lname,email,Airport,Airline,Date,Time,class1,Airport2,Airline2,Date2,Time2,class2,Ref)
  {

    var data= "TravDetails="+TravDetails+"&title="+title+"&fname="+fname+"&lname="+lname+"&email="+email+"&Airport="+Airport+"&Airline="+Airline+"&date="+Date+"&time="+Time+"&class1="+class1
                +"&Airport2="+Airport2+"&Airline2="+Airline2+"&date2="+Date2+"&time2="+Time2+"&class2="+class2+"&Ref="+Ref;
    return this.http.get(this.rootUrl+'api/Email?'+data)
    .map(
      (Response ) => Response.json()
      
    ).subscribe(
      (data) => console.log(data)
    
    )

  };




    putUser(id, prof)
    {
      
        var body =JSON.stringify(prof);
        var headerOptions = new Headers({'Content-Type' : 'application/json'});
        var requestOptions = new RequestOptions({method : RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl+'api/Users?id='+id,body, requestOptions).map(res => res.json());
    
      }  

      deleteUser(id)
      {
          return this.http.delete(this.rootUrl + 'api/Users?id='+id).map(res => res.json());
      }

      postUSerAirport(userid,airportid)
      {

       
      var headerOptions = new Headers({'Content-Type': 'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.http.post(this.rootUrl + 'api/UserAirports',{
        "UserId" : userid,
        "airportId":airportid

      },requestOptions).map(x => x.json());
  


      }


      postUSerFlight(userid,flightid)
      {

       
      var headerOptions = new Headers({'Content-Type': 'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.http.post(this.rootUrl + 'api/UserFlights',{
        "UserId" : userid,
        "FlightId":flightid

      },requestOptions).map(x => x.json());
  


      }

      postFlight(body)
      {

          var headerOptions = new Headers({'Content-Type': 'application/json'});
          var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
          return this.http.post(this.rootUrl +'api/Flights',body,requestOptions).map(x => x.json());
      
      
      };



      getRef()
      {
    
        return this.http.get(this.rootUrl+'api/Ref')
        .map(
          (Response ) => Response.json()
          
        ).subscribe(
          (data) =>
          localStorage.setItem('RefNo',(data))
       
        )

      }


      postRecord(body)
      {

      var headerOptions = new Headers({'Content-Type': 'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.http.post(this.rootUrl + 'api/Records',body,requestOptions).map(x => x.json());
  

      }
      

        
          

  
}
