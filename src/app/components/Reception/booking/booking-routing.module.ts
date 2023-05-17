import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';
import { AllBookingsComponent } from './components/all-bookings/all-bookings.component';

const routes: Routes = [
  { path: '', component: AllBookingsComponent },
  { path:'all-booking', component: AllBookingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
