import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HospitalService } from '../../services/hospital.service';
import { environment } from '../../../../../../../environments/environment';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddHospitalComponent } from '../add-hospital/add-hospital.component';

@Component({
  selector: 'ngx-view-hospital',
  templateUrl: './view-hospital.component.html',
  styleUrls: ['./view-hospital.component.scss']
})
export class ViewHospitalComponent implements OnInit{

  constructor(
    public dialog: MatDialog,
    private router:ActivatedRoute,
    private _hospitalservice:HospitalService,
    private snackBar:MatSnackBar,
    private route:Router) {

  }
  imgUrl=`${environment.imgUrl}`;
  images = [];
  slideIndex = 0;
  id:number;
  hospital:any;
  loading:boolean=true;
   timestamp = new Date().getTime();

  ngOnInit(): void {
    this.router.params.subscribe((params)=>{
      this.id = +params.id
    })
    this.getHospitalById(this.id)
  }

  getHospitalById(id){
    let paylod ={
      lang:'ar'
    }
    this._hospitalservice.getHospitalById(id,paylod).subscribe(
      (res:any)=>{
        this.hospital = res;
        this.loadImages();
        this.loading=false;
      }
    )
    console.log(this.hospital)
  }
  loadImages(){
    this.images = [
      {
        id: 1,
        url: this.hospital.photo
      },
      ]
   return this.images
  }
  openModal() {
   document.getElementById('imgModal').style.display = "block";
  }
  closeModal() {
   document.getElementById('imgModal').style.display = "none";
  }
  plusSlides(n) {
   this.showSlides(this.slideIndex += n);
  }
  currentSlide(n) {
   this.showSlides(this.slideIndex = n);
  }
  showSlides(slideIndex);
  showSlides(n) {
   let i;
   const slides = document.getElementsByClassName("img-slides") as HTMLCollectionOf < HTMLElement > ;
   const dots = document.getElementsByClassName("images") as HTMLCollectionOf < HTMLElement > ;
   if (n > slides.length) {
    this.slideIndex = 1
   }
   if (n < 1) {
    this.slideIndex = slides.length
   }
   for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
   }
   for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
   }
   slides[this.slideIndex - 1].style.display = "block";
   if (dots && dots.length > 0) {
    dots[this.slideIndex - 1].className += " active";
   }
  }

  statusAction(inactive){
    let status
    if(inactive){
      status='active'
    }else {
      status='inactive'
    }
    Swal.fire({
      title: "هل انت متأكد من تغيير حال الفرع ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "الغاء",
    }).then((result) => {
      if (result.isConfirmed === true) {
          this._hospitalservice.activeHospital(this.id,status).subscribe(
            (response: any) => {
              // TODO: handle error status

              // Notify Success
              this.snackBar.open("تمت العملية بنجاح ", "ُsuccess", {
                duration: 3000,
                panelClass: 'success'
              });
              this.getHospitalById(this.id)
            },
            (err) => {
              let error = "Error";

              this.snackBar.open("من فضلك حاول مرة اخري", "error", {
                duration: 3000,
                panelClass: 'error'
              });            }

        );
      }

      // Remove Deleted Academic From List & Update the Service Academic Years
    });
  }
  edit(id){
    // this.route.navigate(["/system/hospitals/edit-hospital",this.id]);
      const dialogRef = this.dialog.open(AddHospitalComponent,{
        width: "1200px",
        disableClose: true,
        data:{
          id:this.id,
        }
      })
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result)
        if(result){
          this.getHospitalById(this.id)
        }
      });
  }
}
