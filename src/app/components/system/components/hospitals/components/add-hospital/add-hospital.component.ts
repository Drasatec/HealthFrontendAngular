import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddInfoTranslateComponent } from '../add-info-translate/add-info-translate.component';
import { HospitalService } from '../../services/hospital.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'ngx-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.scss']
})
export class AddHospitalComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddHospitalComponent>,

  ){}
  selectedTabIndex = 0;
  newHospitalId
  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close({isAdd:true});
  }
  goToAccountTab(data) {
    console.log(data)
    this.newHospitalId=data
    this.selectedTabIndex = 1;

  }
}
