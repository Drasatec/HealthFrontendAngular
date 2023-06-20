import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { ThemeModule } from '../../@theme/theme.module';
import { MatSelectModule } from '@angular/material/select';
import { FilterSystemComponent } from './components/filter-system/filter-system.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { DebounceInputChangeDirective } from '../../@theme/directives/input-change-debounce.directive';
import { ThemeGeneralModule } from '../themegeneral.module';

@NgModule({
  declarations: [
    SystemComponent,
    FilterSystemComponent
  ],
  imports: [

    CommonModule,
    SystemRoutingModule,
    ThemeGeneralModule,
  ],
  exports:[
    FilterSystemComponent,
    ThemeGeneralModule,

  ]
})
export class SystemModule { }
