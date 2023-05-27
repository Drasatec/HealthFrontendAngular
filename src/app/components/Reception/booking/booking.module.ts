import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { AllBookingsComponent } from './components/all-bookings/all-bookings.component';
import { FormsModule } from '../../../pages/forms/forms.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { ThemeModule } from '../../../@theme/theme.module';


@NgModule({
  declarations: [
    BookingComponent,
    AllBookingsComponent,
    AddBookingComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    BookingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    MatRadioModule,
    MatTableModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class BookingModule { }
