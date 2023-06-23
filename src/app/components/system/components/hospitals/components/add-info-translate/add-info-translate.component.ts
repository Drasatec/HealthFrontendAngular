import { Component, OnInit, Output ,EventEmitter, Inject} from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HospitalService } from '../../services/hospital.service';
import { HelperService } from '../../../../../../@theme/services/helper.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'ngx-add-info-translate',
  templateUrl: './add-info-translate.component.html',
  styleUrls: ['./add-info-translate.component.scss']
})
export class AddInfoTranslateComponent implements OnInit{
  formTrans:FormGroup;
  public codes = [{name:'Ar',value:'ar'}, {name:'En',value:'en'}, {name:'Fr',value:'fr'}];

  @Output() onAddTranslate: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddInfoTranslateComponent>,
    private _FormBuilder:FormBuilder,
    private _hospitalService:HospitalService,
    private __helper:HelperService,
    private snackbar:MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  translationData;
  ngOnInit(): void {
    this.createForm()
    console.log(this.data)
    this.getHospitalById(this.data)
  }
  get formControls() {
    return this.formTrans.controls;
  }
  hospital;
  getHospitalById(id){
    this._hospitalService.getHospitalById(id).subscribe(
      (res:any)=>{
        this.hospital=res;
        this.translationData=res.hospitalTrasnlations;
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
    const languages = this.formTrans.get('translations') as FormArray
    if (languages.length > 1) {
      languages.removeAt(i)
      this.removeTranslation(id)

    } else {
      languages.reset()
    }
  }
  removeTranslation(id:number){

      this._hospitalService.deleteTrans(id).subscribe(
        (res:any)=>{
          if(res.success){
            this.snackbar.open("تم حذف المستشفي بنجاح ", "ُsuccess", {
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
      'hospitalId':new FormControl(this.data),
      'id':new FormControl(data?.id? data?.id :null),
      'LangCode': new FormControl(data?.langCode ? data?.langCode :null, Validators.required),
      'Name': new FormControl(data?.name ? data?.name :null),
      'Address': new FormControl(data?.address ? data?.address :null),
      'description': new FormControl(data?.description ? data?.description :null),
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
            body.append('translations['+(i)+'][hospitalId]', this.data);
            body.append('translations['+(i)+'][id]', formVal.translations[i].id);
            body.append('translations['+(i)+'][Name]', formVal.translations[i].Name);
            body.append('translations['+(i)+'][Address]', formVal.translations[i].Address);
            body.append('translations['+(i)+'][LangCode]', formVal.translations[i].LangCode);
            body.append('translations['+(i)+'][description]', formVal.translations[i].description);
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
    this._hospitalService.addTranslation(this.data,this.dataSend).subscribe(
      (res)=>{
        this.closeDialog()
      }
    )
  }
}
