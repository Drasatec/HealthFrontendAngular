import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { DebounceInputChangeDirective } from '../@theme/directives/input-change-debounce.directive';
import { ThemeModule } from '../@theme/theme.module';
import { HttpClientModule } from '@angular/common/http';
import { NbRouteTabsetModule, NbTabsetModule } from '@nebular/theme';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DebounceInputChangeDirective,
  ],
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    MatTableModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    NgSelectModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    HttpClientModule,
    NbRouteTabsetModule,
    NbTabsetModule,
    NgbDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports:[
    DebounceInputChangeDirective,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    MatTableModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    NgSelectModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    HttpClientModule,
    NbRouteTabsetModule,
    NbTabsetModule,
    NgbDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ThemeGeneralModule { }
