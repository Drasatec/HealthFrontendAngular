import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import { BuildingService } from '../../../buildings/services/building.service';
import { DoctorsService } from '../../services/doctors.service';

@Component({
  selector: 'ngx-add-doctor-translate',
  templateUrl: './add-doctor-translate.component.html',
  styleUrls: ['./add-doctor-translate.component.scss']
})
export class AddDoctorTranslateComponent implements OnInit {
  formTrans:FormGroup;
  public codes = [{name:'Ar',value:'ar'}, {name:'En',value:'en'}, {name:'Fr',value:'fr'}];

  @Output() onAddTranslate: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddDoctorTranslateComponent>,
    private _FormBuilder:FormBuilder,
    private _doctorService:DoctorsService,
    private __helper:HelperService,
    private snackbar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  translationData;
  ngOnInit(): void {
    this.createForm()
    console.log(this.data)
      this.getDoctorById(this.data.id)

  }
  get formControls() {
    return this.formTrans.controls;
  }
  doctor;
  getDoctorById(id){
    this._doctorService.getDoctorById(id).subscribe(
      (res:any)=>{
        this.doctor=res;
        this.translationData=res.doctorTranslations;
        this.translationData?.forEach(el => {
          this.addTrans(el);
        })
      }
    )
  }

  addTrans(data?){
      // console.log(data)

      // this.getGrades(data.school_type)
      this.myFormArray.push(this.createEmailFormGroup(data));

  }
  createForm(): void {
    this.formTrans = this._FormBuilder.group({
      translations: this._FormBuilder.array([this.createEmailFormGroup()])
    });
  }
  get myFormArray(): FormArray {
    return this.formTrans.get('translations') as FormArray;
  }
  public addEmailFormGroup() {

    const emails = this.formTrans.get('translations') as FormArray
    emails.push(this.createEmailFormGroup())
  }

  public removeOrClearEmail(i: number,id:number) {
    console.log("remove",id)
    const languages = this.formTrans.get('translations') as FormArray
    if (languages.length > 1) {
      languages.removeAt(i)
      this.removeTranslation(id)
    } else {
      languages.reset()
    }
  }
  removeTranslation(id:number){
      this.delDoctorById(id)

  }
  delDoctorById(id){
    this._doctorService.deleteTrans(id).subscribe(
      (res:any)=>{
        if(res.success){
          this.snackbar.open("تم حذف الدكتور بنجاح ", "ُsuccess", {
            duration: 5000,
            panelClass: 'success'
          });

        }
      }
    )
  }

  private createEmailFormGroup(data?): FormGroup {
    console.log(data)
    return this._FormBuilder.group({
      'DoctorId':new FormControl(this.data.id),
      'id':new FormControl(data?.id? data?.id :null),
      'LangCode': new FormControl(data?.langCode ? data?.langCode :null, Validators.required),
      'FullName': new FormControl(data?.fullName ? data?.fullName :null),
      'About': new FormControl(data?.about ? data?.about :''),
      'Headline': new FormControl(data?.headline ? data?.headline :''),

    })
  }
  closeDialog() {
    this.dialogRef.close(this.formTrans.value);
  }
  formData(obj) {
    console.log(obj)
    obj.translations =
    obj?.translations.map((el) => {
      return this.__helper.deleteNullValues(el);
    });
    let body = new FormData();
    let bodyObj = {}
    const formVal = obj;
    Object.keys(formVal).forEach((key) => {
      if (formVal[key]) {
        bodyObj[key] = formVal[key]
        if (key == "translations") {
          for (let i = 0; i < formVal['translations'].length; i++) {
              body.append('translations['+(i)+'][DoctorId]', this.data.id);

            body.append('translations['+(i)+'][Id]', formVal.translations[i].id);
            body.append('translations['+(i)+'][FullName]', formVal.translations[i].FullName);
            body.append('translations['+(i)+'][LangCode]', formVal.translations[i].LangCode);
            body.append('translations['+(i)+'][About]', formVal.translations[i].About);
            body.append('translations['+(i)+'][Headline]', formVal.translations[i].Headline);

          }
        }
        else {
          body.append(key, formVal[key]);
        }

      }
    });
    return body;
  }
  dataSend;
  save(){
    this.dataSend=this.formData(this.formTrans.value)
      this._doctorService.addTranslation(this.data.id,this.dataSend).subscribe(
        (res)=>{
          this.closeDialog()
        }
      )

  }
}
