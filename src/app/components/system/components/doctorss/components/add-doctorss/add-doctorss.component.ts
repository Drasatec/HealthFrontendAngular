import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LookupService } from '../../../../../../@theme/services/lookup.service';


@Component({
  selector: 'ngx-add-doctorss',
  templateUrl: './add-doctorss.component.html',
  styleUrls: ['./add-doctorss.component.scss']
})
export class AddDoctorssComponent implements OnInit{
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddDoctorssComponent>,
    private lookupservice:LookupService

  ){}
  selectedTabIndex = 0;
  doctorInfo;

  ngOnInit(): void {
    console.log(this.doctorInfo)
  }
  closeDialog() {
    this.dialogRef.close({isAdd:true});
  }
  goToAccountTab(data) {
    this.doctorInfo=data
    this.selectedTabIndex = 1;

  }
  hospitals;
  speciality;
  onTabChange(e) {
    console.log("ddddddddd",this.doctorInfo)
      if (e.tabTitle=== "البيانات الوظيفية") {
      // Make API call for Tab 1
      let payload ={
        doctorId:this.doctorInfo.id
      }
      this.lookupservice.getAllHospitalsNames(payload).subscribe(data => {
        // Process the API response
        this.hospitals=data
      });
      this.lookupservice.getAllSpecialNames(payload).subscribe(data => {
        // Process the API response
        this.speciality=data
      });
    }
    
  }

}
