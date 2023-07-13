import { Component, Inject, OnInit } from '@angular/core';
import { SpecialService } from '../../services/special.service';
import { AddBuildTranslateComponent } from '../../../buildings/components/add-build-translate/add-build-translate.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import { LookupService } from '../../../../../../@theme/services/lookup.service';

@Component({
  selector: 'ngx-add-special',
  templateUrl: './add-special.component.html',
  styleUrls: ['./add-special.component.scss']
})
export class AddSpecialComponent implements OnInit {
  form: FormGroup;
  loading=false
  imgUrl=`${environment.imgUrl}`;
  appears=[{name:'يظهر' ,value:true},{name:'يختفي' ,value:false}]
  constructor(
    private _FormBuilder: FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private _specialservice:SpecialService,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private _helpservice:HelperService,
    private _lookpservice:LookupService,
    public dialogRef: MatDialogRef<AddSpecialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  id:number;
  special:any;
  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (param)=>{
    // console.log(param)

    //     this.id =param.id;
    //   }
    // )
    this.id=this.data ? this.data.id : null
    this.createForm();
    if(this.id){
      this.getSpecialById(this.id);
    }

  }

  getSpecialById(id){
    let paylod={
      lang:'ar'
    }
    this._specialservice.getMedicalSpecialById(id,paylod).subscribe(
      (res:any)=>{
        this.special = res;
        this.patchForm();
      }
    )
  }
  patchForm(){
    this.form.patchValue({
      codeNumber:this.special.codeNumber?this.special.codeNumber:null,
      name:this.special.medicalSpecialtyTranslations.length > 0?this.special.medicalSpecialtyTranslations[0].name:null,
      description:this.special.medicalSpecialtyTranslations.length > 0?this.special.medicalSpecialtyTranslations[0].description:null,
      appearance:this.special.appearance?this.special.appearance:null

  })
  console.log(this.form.value)
  }
  createForm(): void {
    this.form = this._FormBuilder.group({
      codeNumber: [null],
      appearance:[null],
      name:[null,Validators.required],
      description:[null],
    });
  }
  get formControls() {
    return this.form.controls;
  }
  translateData;
  openTranslateDialog(){
    const dialogRef = this.dialog.open(AddBuildTranslateComponent,{
      width: "1200px",
      disableClose: true,
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result){
      }
    });
  }
  newRoomId;
  save(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading=true
      this.prepareDataBeforeSend(this.form.value);
      if(!this.id){
        this._specialservice.createMedicalSpecial(this.sendData).subscribe(
          (res)=>{
        this.loading=false

              this.newRoomId=res.id;
              this.snackBar.open("تم اضافة التخصص بنجاح ", "ُsuccess", {
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
        this._specialservice.editMedicalSpecial(this.id,this.sendData).subscribe(
          (res)=>{
        this.loading=false

            this.snackBar.open("تم تعديل التخصص بنجاح ", "ُsuccess", {
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
    this.dialogRef.close(this.newRoomId);
  }
  closeEditDialog() {
    this.dialogRef.close({isAdd:true});
  }

  sendData;
  prepareDataBeforeSend(data){
    console.log(data)
    let paylod={
      ...data,
      MedicalSpecialtyTranslations:[{
        id:this.id ? this.special.medicalSpecialtyTranslations[0].id:0,
        Name:data.name,
        Description:data.description,
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
        if (key == "MedicalSpecialtyTranslations") {
          for (let i = 0; i < formVal['MedicalSpecialtyTranslations'].length; i++) {
            if(this.id){body.append('MedicalSpecialtyTranslations['+(i)+'][id]', formVal.MedicalSpecialtyTranslations[i].id );}
            body.append('MedicalSpecialtyTranslations['+(i)+'][Name]', formVal.MedicalSpecialtyTranslations[i].Name);
            body.append('MedicalSpecialtyTranslations['+(i)+'][LangCode]', formVal.MedicalSpecialtyTranslations[i].LangCode);
            body.append('MedicalSpecialtyTranslations['+(i)+'][Description]', formVal.MedicalSpecialtyTranslations[i].Description);
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

}

