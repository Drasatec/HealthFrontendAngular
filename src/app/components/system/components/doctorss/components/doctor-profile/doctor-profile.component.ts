import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddDoctorssComponent } from '../add-doctorss/add-doctorss.component';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService } from '../../services/doctors.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'ngx-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

  constructor(private dialog:MatDialog,private route:ActivatedRoute,private _doctorservice:DoctorsService) { }
  id;
  imgUrl=`${environment.imgUrl}`;
  timestamp = new Date().getTime();

  ngOnInit(): void {
    this.route.params.subscribe(
      (params)=>{
        this.id=params.id
        console.log(params)
        this.getBasicInfo()
        this.getDoctorAttachment()
      }
    )
  }
  doctorInfo
  getBasicInfo(){
    this._doctorservice.getDoctorById(this.id).subscribe(
      (res)=>{
        this.doctorInfo =res
      }
    )
  }
  doctorAttachments
  getDoctorAttachment(){
    let paylod={
      docId : this.id
    }
    this._doctorservice.getAllAttachment(paylod).subscribe(
      (res)=>{
        this.doctorAttachments =res
      }
    )
  }
    attachLink =`${environment.showAttach}Files/`

  viewAttach(name){
    window.open(this.attachLink+name, "_blank");

  }
  openEditDoctors(){
    const dialogRef = this.dialog.open(AddDoctorssComponent,{
      width: "1200px",
      disableClose: true,
      data:{
        id:this.id,
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){

      }
    });
  }
}
