import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {AgmCoreModule} from '@agm/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { TravellersComponent } from './travellers/travellers.component';
import { TravellerComponent } from './travellers/traveller/traveller.component';
import { ToastrModule} from 'ngx-toastr';
import { SignInComponent } from './travellers/sign-in/sign-in.component';

import { TravellerService } from './travellers/Shared/traveller.service';
import { DetailsService } from './travellers/Shared/details.service';
import {HotelService} from './travellers/Shared/hotel.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './travellers/home/home.component';
import { FlightSearchFilterPipe } from './travellers/home/FlightSearch-Pipe';
import { ClickOutsideDirective } from './travellers/home/flightSearchDirective';





import { HotelComponent } from './travellers/hotel/hotel.component';
import { CarComponent } from './travellers/car/car.component';
import { FlightViewComponent } from './travellers/home/flight-view/flight-view.component';
import { TravellerInfoComponent } from './travellers/home/traveller-info/traveller-info.component';
import { PaymentComponent } from './travellers/home/payment/payment.component';
import { DateComponent } from './travellers/hotel/date/date.component';
import { HotelviewComponent } from './travellers/hotel/hotelview/hotelview.component';
import { RoomviewComponent } from './travellers/hotel/roomview/roomview.component';
import { AdminComponent } from './travellers/admin/admin.component';
import { AuthGuard } from './travellers/Auth/auth.guard';
import { ProfileComponent } from './travellers/profile/profile.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RoomDetailsComponent } from './travellers/hotel/room-details/room-details.component';
import { NgbdDatepickerPopupComponent } from './travellers/ngbd-datepicker-popup/ngbd-datepicker-popup.component';


const appRoutes: Routes = [
  {
    path: 'travellers',
    component:TravellersComponent
  },
  {
  path:'travellers/traveller',
  component:TravellerComponent
  },
  {
    path:'travellers/sign-in',
    component:SignInComponent
  },
  {
    path:'travellers/home',
    component:HomeComponent
   // canActivate:[AuthGuard]
  },
  {
    path:'travellers/admin',
    component:AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'travellers/car',
    component:CarComponent
  },
  {
    path:'travellers/home/flight-view',
    component:FlightViewComponent
  },
  {
    path:'travellers/home/traveller-info',
    component:TravellerInfoComponent
  },
  {
    path:'travellers/home/payment',
    component: PaymentComponent
  },
  {
    path:'travellers/hotel',
    component:HotelComponent
  },
  {
    path:'travellers/hotel/hotelview',
    component:HotelviewComponent
  },
  {
    path:'travellers/hotel/roomview',
    component:RoomviewComponent
  },
  {
    path:'travellers/hotel/RoomDetails',
    component:RoomDetailsComponent
  },
  {
    path:'travellers/profile',
    component:ProfileComponent
  },
  {
    path : '', 
    redirectTo:'travellers/home',
    pathMatch : 'full'
}]

@NgModule({
  declarations: [
    AppComponent,
    TravellersComponent,
    TravellerComponent,
    SignInComponent,
    HomeComponent,
    FlightSearchFilterPipe,
    ClickOutsideDirective,
   
    HotelComponent,
    CarComponent,
    FlightViewComponent,
    TravellerInfoComponent,
    PaymentComponent,
    DateComponent,
    HotelviewComponent,
    RoomviewComponent,
    AdminComponent,
    ProfileComponent,
    RoomDetailsComponent,
    NgbdDatepickerPopupComponent
  

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  
  ],
  
  providers: [TravellerService,DetailsService,HotelService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

