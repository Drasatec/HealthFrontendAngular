import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { DoctorsService } from '../../services/doctors.service';
import { AddDoctorTranslateComponent } from '../add-doctor-translate/add-doctor-translate.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../../@theme/services/lookup.service';
import { NbTabsetComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-add-doctorss',
  templateUrl: './add-doctorss.component.html',
  styleUrls: ['./add-doctorss.component.scss']
})
export class AddDoctorssComponent implements OnInit{
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddDoctorssComponent>,

  ){}
  selectedTabIndex = 0;
  doctorInfo;

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close({isAdd:true});
  }
  goToAccountTab(data) {
    this.doctorInfo=data
    this.selectedTabIndex = 1;

  }


}
