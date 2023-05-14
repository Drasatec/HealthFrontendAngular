import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AukReTableComponent } from './auk-re-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableActionsComponent } from './components/table-actions/table-actions.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { RouterModule } from '@angular/router';
import { FeatureImageComponent } from './components/feature-image/feature-image.component';
import { TableComboboxComponent } from './components/table-combobox/table-combobox.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableHumanCardComponent } from './components/table-human-card/table-human-card.component';
import { TableTagComponent } from './components/table-tag/table-tag.component';
import { RowTitleComponent } from './components/row-title/row-title.component';
import { ShortNumberComponent } from './components/short-number/short-number.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { StatusComponent } from './components/status/status.component';
import { PrintedComponent } from './components/printed/printed.component';
import { MedicalComponent } from './components/medical/medical.component';
import { AttendanceActionsComponent } from './components/attendance-actions/attendance-actions.component';
import { NgxResizeWatcherDirective } from './directives/ngx-resize-watcher/ngx-resize-watcher.directive';
import { TableDebounceInputChangeDirective } from "./directives/debounce.directive";
import { CustodyComponent } from './components/custody/custody.component';
import { PopOverComponent } from './components/pop-over/pop-over.component';
import { PeriodsComponent } from './components/periods/periods.component';
import { WeekComponent } from './components/week/week.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DeleteActionComponent } from './components/delete-action/delete-action.component';
import { ActiveStudentComponent } from './components/active-student/active-student.component';
import { CRUDTableModule } from '../shared/crud-table';



@NgModule({
  declarations: [
    AukReTableComponent,
    TableActionsComponent,
    FeatureImageComponent,
    TableComboboxComponent,
    TableHumanCardComponent,
    TableTagComponent,
    RowTitleComponent,
    ShortNumberComponent,
    DropdownComponent,
    StatusComponent,
    PrintedComponent,
    MedicalComponent,
    AttendanceActionsComponent,
    NgxResizeWatcherDirective,
    TableDebounceInputChangeDirective,
    CustodyComponent,
    PopOverComponent,
    PeriodsComponent,
    WeekComponent,
    DeleteActionComponent,
    ActiveStudentComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    RouterModule,
    CommonModule,
    NgSelectModule,
    MatButtonModule,
    MatDialogModule,
    InlineSVGModule,
    CRUDTableModule,
    MatCheckboxModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxSpinnerModule,

  ],
  exports: [
    AukReTableComponent,
    MatIconModule
  ]
})
export class AukReTableModule { }
