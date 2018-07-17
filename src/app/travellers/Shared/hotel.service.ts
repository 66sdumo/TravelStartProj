import { Injectable } from '@angular/core';
import {Hotel} from '../../travellers/Shared/hotel.model'
import {Locations} from '../../travellers/Shared/locations.model'
import {Http, Response,Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Room} from '../../travellers/Shared/room.model'


@Injectable()
export class HotelService {

 city:string =JSON.parse(localStorage.getItem('city'));

 name : any = JSON.parse(localStorage.getItem('name'));
 


hotelList : Hotel[];
LocationList : Locations[];

roomlist : Room[];


readonly rootUrl ='http://localhost:52936';
constructor(private http : Http) { }

  

getList()
{
  this.http.get(this.rootUrl+'/api/Locations')
  .map((data : Response) => {
    return data.json() as Locations[];
  }).toPromise().then(x => {
    this.LocationList = x;
   // alert(this.LocationList);
  })
}

getHotelList( locate )
{
locate="locate="+this.city;
  this.http.get(this.rootUrl+'/api/Hotels?'+locate)
  .map((data : Response) => {
    return data.json() as Hotel[];
  }).toPromise().then(x => {
    this.hotelList = x;
  })
}

getRoomList( hotelname )
{
hotelname="name="+this.name;
  this.http.get(this.rootUrl+'/api/Rooms?'+hotelname)
  .map((data : Response) => {
    return data.json() as Room[];
  }).toPromise().then(x => {
    this.roomlist = x;
  })
}


}
