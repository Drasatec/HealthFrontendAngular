import { Component, Inject, OnInit } from '@angular/core';
import { DoctorsService } from '../../services/doctors.service';
import { AddDoctorTranslateComponent } from '../add-doctor-translate/add-doctor-translate.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../../@theme/services/lookup.service';

@Component({
  selector: 'ngx-add-doctorss',
  templateUrl: './add-doctorss.component.html',
  styleUrls: ['./add-doctorss.component.scss']
})
export class AddDoctorssComponent{
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddDoctorssComponent>,

  ){}
  closeDialog() {
    this.dialogRef.close({isAdd:true});
  }
}
