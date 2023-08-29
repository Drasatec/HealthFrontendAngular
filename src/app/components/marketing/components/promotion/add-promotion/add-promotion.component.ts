import { Component, Inject, OnInit } from '@angular/core';
import { PromotionService } from '../../../services/promotion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { HelperService } from '../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../@theme/services/lookup.service';
import { AddHospitalComponent } from '../../../../system/components/hospitals/components/add-hospital/add-hospital.component';
import { AddInfoTranslateComponent } from '../../../../system/components/hospitals/components/add-info-translate/add-info-translate.component';

@Component({
  selector: 'ngx-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.scss']
})
export class AddPromotionComponent implements OnInit {
  form: FormGroup;
  imgUrl=`${environment.imgUrl}`;

  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _buildingService:PromotionService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddPromotionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  id:number;
  building:any;
  loading=false
  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (param)=>{
    // console.log(param)

    //     this.id =param.id;
    //   }
    // )
    this.id=this.data? this.data.id :null
    this.createForm();
    if(this.id){
      this.getBuildingById(this.id);
    }
  }
  
  getBuildingById(id){
    let paylod={
      lang:'ar',
      id:id
    }
    this._buildingService.getPromotionById(paylod).subscribe(
      (res:any)=>{
        this.building = res;
        this.patchForm();
      }
    )
  }
  phoneNumbers;
  patchForm(){
    this.form.patchValue({
      Title:this.building.promotionsTranslations.length > 0 ? this.building.promotionsTranslations[0].title : null,
      Description:this.building.promotionsTranslations.length > 0 ? this.building.promotionsTranslations[0].description : null,
      LangCode:this.building.promotionsTranslations.length > 0 ? this.building.promotionsTranslations[0].langCode : null,
      Position:this.building.position ? this.building.position : 0
    })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      Title: [null],
      Description: [null],
      LangCode:['ar'],
      Position:[],
      file:[null]
    });
  }
  get formControls() {
    return this.form.controls;
  }
  translateData;
  openTranslateDialog(){
    const dialogRef = this.dialog.open(AddInfoTranslateComponent,{
      width: "1200px",
      disableClose: true,
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
      }
    });
  }
  newBuildId;

  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){
        this._buildingService.createPromotion(this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.newBuildId = res.id
            this.snackBar.open("تم اضافة الاعلان بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.closeDialog()
          },
          (err) => {
            this.loading=false
            this.snackBar.open("من فضلك حاول مرة اخري", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }else{
        this._buildingService.editPromotion(this.sendData).subscribe(
          (res)=>{
            this.loading=false
            this.snackBar.open("تم تعديل الاعلان بنجاح ", "ُsuccess", {
              duration: 5000,
              panelClass: 'success'
            });
            this.closeEditDialog()
          },
          (err) => {
            this.loading=false
            this.snackBar.open("من فضلك حاول مرة اخري", "ُError", {
              duration: 3000,
              panelClass: 'error'
            });

          }
        )
      }

    }
  }

  closeDialog() {
    this.dialogRef.close(this.newBuildId);
  }
  closeEditDialog() {
    this.dialogRef.close({isAdd:true});
  }
  sendData;
  prepareDataBeforeSend(data){
    console.log(data)
    let paylod={
      ...data,
      id:this.building? this.building.id:null,
      PromotionsTranslations:[{
        id:this.id ? this.building.promotionsTranslations[0].id:0,
        Title:data.Title,
        Description:data.Description,
        LangCode:'ar',
      }],
      file:this.files[0],
    }
    this.sendData=this.formData(paylod)
  }
  formData(obj) {
    console.log(obj)

    let body = new FormData();
    let bodyObj = {}
    const formVal = obj;
    Object.keys(formVal).forEach((key) => {
      if (formVal[key]) {
        bodyObj[key] = formVal[key]
        if (key == "PromotionsTranslations") {
          for (let i = 0; i < formVal['PromotionsTranslations'].length; i++) {
            body.append('PromotionsTranslations['+(i)+'][id]', formVal.PromotionsTranslations[i].id );
            body.append('PromotionsTranslations['+(i)+'][Title]', formVal.PromotionsTranslations[i].Title);
            body.append('PromotionsTranslations['+(i)+'][Description]', formVal.PromotionsTranslations[i].Description);
            body.append('PromotionsTranslations['+(i)+'][LangCode]', formVal.PromotionsTranslations[i].LangCode);
          }
        }
        else if (key == "PhoneNumbers") {
          for (let i = 0; i < formVal['PhoneNumbers'].length; i++) {
            body.append('PhoneNumbers['+(i)+'][id]', formVal.PhoneNumbers[i].id);
            body.append('PhoneNumbers['+(i)+'][TelephoneNumber]', formVal.PhoneNumbers[i].TelephoneNumber);
          }
        }
        else {
          body.append(key, formVal[key]);
        }

      }
    });
    return body;
  }
  cancel(){
    this.form.reset()
  }

  /** attachment */
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  openDialog(){
    const dialogRef = this.dialog.open(AddHospitalComponent,{
      width: "1200px",
      maxHeight:'80%'
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
        
      }
    });
  }

}
