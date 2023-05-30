import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopHospitalComponent } from '../stop-hospital/stop-hospital.component';
import { HospitalService } from '../../services/hospital.service';
import { HospitalModel } from '../../models/hospital.model';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'ngx-view-hospital',
  templateUrl: './view-hospital.component.html',
  styleUrls: ['./view-hospital.component.scss']
})
export class ViewHospitalComponent implements OnInit{

  constructor(
    public dialog: MatDialog,
    private router:ActivatedRoute,
    private _hospitalservice:HospitalService) {

  }
  imgUrl=`${environment.imgUrl}`;
  images = [];
  slideIndex = 0;
  id:number;
  hospital:any
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

  openDialog() {
    const dialogRef = this.dialog.open(StopHospitalComponent, {
      width: "800px",
      data: {

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
