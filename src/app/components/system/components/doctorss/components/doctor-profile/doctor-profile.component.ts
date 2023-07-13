import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddDoctorssComponent } from '../add-doctorss/add-doctorss.component';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService } from '../../services/doctors.service';
import { environment } from '../../../../../../../environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
  isDragging:boolean
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: [ '<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params)=>{
        this.id=params.id
        console.log(params)
        this.getBasicInfo()
        this.getDoctorAttachment()
        this.getDoctorPeriods()
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
  doctorPeriods
  getDoctorPeriods(){
    let paylod={
      docId : this.id,
      lang:'ar'
    }
    this._doctorservice.getDoctorPeriod(paylod).subscribe(
      (res)=>{
        this.doctorPeriods=res
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
        this.getBasicInfo()
        this.getDoctorAttachment()
        this.getDoctorPeriods()
      }
    });
  }
}
