import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';
import { AllBookingsComponent } from './components/all-bookings/all-bookings.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { ViewBookingComponent } from './components/view-booking/view-booking.component';

const routes: Routes = [
  { path: '', component: BookingComponent,
    children:[
      { path:'all-booking', component: AllBookingsComponent},
      { path:'add-booking', component: AddBookingComponent},
      { path:'edit-booking/:id', component: AddBookingComponent},
      { path:'view-booking/:id', component: ViewBookingComponent},

      { path:'', redirectTo:'all-booking',pathMatch:'full'},
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
export const routedComponents = [
  AllBookingsComponent,
  AddBookingComponent,
];
