import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperService } from '../../../../../@theme/services/helper.service';

@Component({
  selector: 'ngx-patient-translation',
  templateUrl: './patient-translation.component.html',
  styleUrls: ['./patient-translation.component.scss']
})
export class PatientTranslationComponent implements OnInit {
  formTrans:FormGroup;
  loading=false
  public codes = [{name:'Ar',value:'ar'}, {name:'En',value:'en'}, {name:'Fr',value:'fr'}];

  @Output() onAddTranslate: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<PatientTranslationComponent>,
    private _FormBuilder:FormBuilder,
    private _patientService:PatientService,
    private __helper:HelperService,
    private snackbar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  translationData;
  ngOnInit(): void {
    this.createForm()
    console.log(this.data)
      this.getPatientById(this.data)

  }
  get formControls() {
    return this.formTrans.controls;
  }
  patient;
  getPatientById(id){
    this._patientService.getPatientById(id).subscribe(
      (res:any)=>{
        this.patient=res;
        this.translationData=res.patientTranslations;
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
      this.delPatientById(id)

  }
  delPatientById(id){
    this._patientService.deleteTrans(id).subscribe(
      (res:any)=>{
        if(res.success){
          this.snackbar.open("تم حذف المريض بنجاح ", "ُsuccess", {
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
      'PatientId':new FormControl(data?this.data:null),
      'id':new FormControl(data?.id? data?.id :null),
      'LangCode': new FormControl(data?.langCode ? data?.langCode :null, Validators.required),
      'FullName': new FormControl(data?.fullName ? data?.fullName :null, Validators.required),
      'Occupation': new FormControl(data?.occupation ? data?.occupation :''),
      'Address': new FormControl(data?.address ? data?.address :''),

    })
  }
  closeDialog() {
    this.dialogRef.close(this.formTrans.value);
  }
  formData(obj) {
    console.log(obj)
    obj.translations =
    obj?.translations.map((el) => {
      return this.__helper.deleteNullValuesFetchCriteria(el);
    });
    obj.translations = obj.translations.filter((translation) => Object.keys(translation).length !== 0);

    console.log(obj)

    let body = new FormData();
    let bodyObj = {}
    const formVal = obj;
    Object.keys(formVal).forEach((key) => {
      if (formVal[key]) {
        bodyObj[key] = formVal[key]
        if (key == "translations") {
          for (let i = 0; i < formVal['translations'].length; i++) {
              body.append('translations['+(i)+'][PatientId]', this.data);

            body.append('translations['+(i)+'][Id]', formVal.translations[i].id ?formVal.translations[i].id:0);
            body.append('translations['+(i)+'][FullName]', formVal.translations[i].FullName);
            body.append('translations['+(i)+'][LangCode]', formVal.translations[i].LangCode);
            body.append('translations['+(i)+'][Address]', formVal.translations[i].Address);
            body.append('translations['+(i)+'][Occupation]', formVal.translations[i].Occupation);


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
    this.formTrans.markAllAsTouched();
    if (this.formTrans.valid) {
      this.loading=true
      this.dataSend=this.formData(this.formTrans.value)
      this._patientService.addTranslation(this.data,this.dataSend).subscribe(
        (res)=>{
          this.loading=false

          this.closeDialog()
        },
        (err) => {
          this.loading=false
          this.snackbar.open("من فضلك حاول مرة اخري", "ُError", {
            duration: 3000,
            panelClass: 'error'
          });

        }
      )
    }
  }
}
